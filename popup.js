const toggle = document.getElementById('autoHideToggle');
const statusIcon = document.getElementById('statusIcon');
const hideNowBtn = document.getElementById('hideNowBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Carrega estado salvo (default = true)
chrome.storage.sync.get(['autoHide'], (data) => {
    const enabled = data.autoHide !== false; // default true
    toggle.checked = enabled;
    statusIcon.textContent = enabled ? '✅' : '❌';
});

// Quando o usuário muda o toggle
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ autoHide: enabled });
    statusIcon.textContent = enabled ? '✅' : '❌';

    // Envia mensagem para content.js
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'toggleAutoHide', enabled });
    });
});

// Botão “Hide Current Shorts”
hideNowBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'hideShortsNow' });
    });
});

// Botão “Settings” place holder
//PopUp dentro do popUp
settingsBtn.addEventListener('click', () => {
    // Verifica se a mensagem já existe
    const existingMsg = document.getElementById('devMessage');

    if (existingMsg) {
        // Se existir, remove (toggle)
        existingMsg.remove();
        return;
    }

    // Cria a mensagem
    const message = document.createElement('div');
    message.id = 'devMessage';
    message.style.padding = '10px';
    message.style.backgroundColor = '#ffcc00';
    message.style.color = '#000';
    message.style.borderRadius = '5px';
    message.style.marginTop = '10px';
    message.style.textAlign = 'center';
    message.style.position = 'relative';

    // Texto da mensagem
    message.textContent = 'Under development';

    // Botão X para fechar
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '✖';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '2px';
    closeBtn.style.right = '5px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.addEventListener('click', () => {
        message.remove();
    });

    message.appendChild(closeBtn);
    document.body.appendChild(message);
});

// Botão GitHub
document.getElementById('githubBtn').addEventListener('click', () => {
    window.open('https://github.com/seu-repositorio', '_blank');
  });