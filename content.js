// Utility function to normalize URLs
function normalizeUrl(url) {
  let normalizedUrl = url.replace(/^https?:\/\//, ''); // Remove http:// and https://
  normalizedUrl = normalizedUrl.replace(/^www\./, ''); // Remove www.
  normalizedUrl = normalizedUrl.split('/')[0]; // Remove path and query
  return normalizedUrl.toLowerCase(); // Convert to lowercase for case-insensitive comparison
}

// Function to check if the current URL is on the whitelist
async function checkBlocked() {
  console.log("Fetching whitelist websites list...");

  try {
    const response = await fetch(chrome.runtime.getURL('websites.txt'));
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const text = await response.text();
    const whitelistUrls = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Normalize whitelist URLs
    const normalizedWhitelistUrls = whitelistUrls.map(normalizeUrl);

    const currentUrl = new URL(window.location.href).hostname;
    const normalizedCurrentUrl = normalizeUrl(currentUrl);

    console.log("Whitelist URLs:", normalizedWhitelistUrls);
    console.log("Current URL:", normalizedCurrentUrl);

    if (normalizedWhitelistUrls.includes(normalizedCurrentUrl)) {
      console.log("URL is whitelisted. No overlay.");
    } else {
      console.log("URL is not whitelisted. Showing overlay...");
      showOverlay();
    }
  } catch (error) {
    console.error("Error fetching or processing the whitelist websites list:", error);
  }
}

// Function to show the overlay
function showOverlay() {
  console.log("Creating and displaying the overlay...");
  
  let overlay = document.createElement('div');
  overlay.id = 'baeldung-blocker-overlay';
  
  // Apply styles directly
  overlay.style.position = 'fixed';  // Position it fixed to cover the viewport
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';     // Full viewport width
  overlay.style.height = '100vh';    // Full viewport height
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)';  // Solid black background (non-transparent)
  overlay.style.zIndex = '9999';    // High z-index to be on top of other content
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'white';
  overlay.style.fontSize = '24px';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.textAlign = 'center';
  overlay.innerText = 'Content blocked by Overlay Blocker';
  
  document.body.appendChild(overlay);
}

// Run the check when the content script is executed
checkBlocked();
