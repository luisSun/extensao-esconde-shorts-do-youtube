(function () {
    'use strict';
  
    let observer;
    let shortsHiddenTemporarily = false;
  
    function hideShorts() {
      document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer').forEach(el => {
        const title = el.querySelector('#title')?.textContent || '';
        if (title.toLowerCase().includes('shorts')) {
          el.style.display = 'none';
        }
      });
    }
  
    function showShorts() {
      document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer').forEach(el => {
        const title = el.querySelector('#title')?.textContent || '';
        if (title.toLowerCase().includes('shorts')) {
          el.style.display = '';
        }
      });
    }
  
    function enableAutoHide() {
      hideShorts();
      observer = new MutationObserver(hideShorts);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  
    // Pega valor salvo e aplica
    chrome.storage.sync.get(['autoHide'], (data) => {
      const autoHide = data.autoHide !== false; // default = true
      if (autoHide) enableAutoHide();
    });
  
    // Escuta mensagens do popup
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'hideShortsNow') {
        shortsHiddenTemporarily = !shortsHiddenTemporarily;
        if (shortsHiddenTemporarily) {
          hideShorts();
        } else {
          showShorts();
        }
      }
  
      if (msg.type === 'toggleAutoHide') {
        if (msg.enabled) {
          enableAutoHide();
        } else {
          if (observer) observer.disconnect();
          location.reload();
        }
      }
    });
    
  })();
  