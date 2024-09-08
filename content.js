// Create a full-screen div to act as an overlay
let overlay = document.createElement('div');
overlay.id = 'baeldung-blocker-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
overlay.style.zIndex = '9999';  // Ensure it's on top of everything
overlay.style.display = 'flex';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.color = 'white';
overlay.style.fontSize = '24px';
overlay.innerText = 'Content blocked by Baeldung Overlay Blocker';

// Append overlay to the body
document.body.appendChild(overlay);
