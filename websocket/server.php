<?php
$host = '0.0.0.0';
$port = 8080;
$server = stream_socket_server("tcp://{$host}:{$port}", $errno, $errstr);
if (! $server) {
    fwrite(STDERR, "WebSocket bind failed: $errstr ($errno)\n");
    exit(1);
}

$clients = [];
$handshaken = [];
$queueFile = '/tmp/blood_socket_queue.log';
$pointer = 0;

echo "WebSocket server running on ws://{$host}:{$port}\n";

while (true) {
    $read = array_merge([$server], $clients);
    $write = null;
    $except = null;
    @stream_select($read, $write, $except, 1);

    if (in_array($server, $read, true)) {
        $conn = stream_socket_accept($server, 0);
        if ($conn) {
            stream_set_blocking($conn, false);
            $clients[(int) $conn] = $conn;
        }
        unset($read[array_search($server, $read, true)]);
    }

    foreach ($read as $sock) {
        $data = @fread($sock, 2048);
        if ($data === '' || $data === false) {
            fclose($sock);
            unset($clients[(int) $sock], $handshaken[(int) $sock]);
            continue;
        }

        if (! isset($handshaken[(int) $sock])) {
            if (preg_match('/Sec-WebSocket-Key: (.*)\r\n/', $data, $matches)) {
                $key = trim($matches[1]);
                $accept = base64_encode(pack('H*', sha1($key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
                $upgrade = "HTTP/1.1 101 Switching Protocols\r\n"
                    . "Upgrade: websocket\r\n"
                    . "Connection: Upgrade\r\n"
                    . "Sec-WebSocket-Accept: {$accept}\r\n\r\n";
                fwrite($sock, $upgrade);
                $handshaken[(int) $sock] = true;
            }
        }
    }

    if (file_exists($queueFile)) {
        $handle = fopen($queueFile, 'r');
        fseek($handle, $pointer);
        while (($line = fgets($handle)) !== false) {
            $frame = chr(0x81) . chr(strlen(trim($line))) . trim($line);
            foreach ($clients as $client) {
                if (isset($handshaken[(int) $client])) {
                    @fwrite($client, $frame);
                }
            }
        }
        $pointer = ftell($handle);
        fclose($handle);
    }
}
