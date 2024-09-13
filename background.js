chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.local.get(['texts'], (result) => {
    const urls = result.texts || [];
    const currentUrl = new URL(details.url).hostname;

    // Check if any saved URL matches the current URL
    const shouldBlock = urls.some(url => currentUrl.includes(url));

    if (shouldBlock) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ['content.js']
      });
    }
  });
}, {url: [{urlMatches: '.*'}]});
