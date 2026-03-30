const alertsEl = document.querySelector('[data-alerts]');

function renderAlert(msg) {
  if (!alertsEl) return;
  const item = document.createElement('div');
  item.textContent = msg;
  item.style.padding = '8px 12px';
  item.style.border = '1px solid #d17';
  item.style.borderRadius = '10px';
  item.style.marginBottom = '8px';
  item.style.background = '#fff';
  alertsEl.prepend(item);
}

(function initWS() {
  const wsProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const socket = new WebSocket(`${wsProtocol}://${location.hostname}:8080`);
  socket.onopen = () => console.log('Emergency websocket connected');
  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type === 'emergency') {
        renderAlert(`🚨 Emergency request for ${payload.blood_group} at ${payload.hospital}`);
      }
    } catch (error) {
      console.warn('Malformed websocket payload', error);
    }
  };
})();
