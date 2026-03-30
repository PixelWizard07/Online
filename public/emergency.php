<?php require __DIR__ . '/partials.php'; render_head('Emergency Requests'); ?>
<main class="container" style="max-width:820px;padding-bottom:40px">
  <h1 style="font-size:48px;color:#c51f24">Emergency Blood Request</h1>
  <p>Requests are stored in MySQL and broadcast live over WebSocket to connected donors.</p>
  <form method="post" action="/../api/emergency.php" style="background:#fff;padding:20px;border-radius:14px;border:1px solid #ddd">
    <p><input name="hospital" required placeholder="Hospital Name" style="width:100%;padding:10px"></p>
    <p><input name="blood_group" required placeholder="Blood Group Needed" style="width:100%;padding:10px"></p>
    <p><input name="units" required type="number" min="1" placeholder="Units Required" style="width:100%;padding:10px"></p>
    <p><button class="card-btn" type="submit">Broadcast Emergency</button></p>
  </form>
  <h2>Live Alerts</h2>
  <div data-alerts></div>
</main>
<?php render_end(); ?>
