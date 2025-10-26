console.log('Service worker da extensão iniciado.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensão instalada ou atualizada.');
});