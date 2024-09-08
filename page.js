// Function to load stored texts and display them
function loadTexts() {
  chrome.storage.local.get(['texts'], (result) => {
    const texts = result.texts || [];
    const textList = document.getElementById('textList');
    textList.innerHTML = '';
    texts.forEach(text => {
      const div = document.createElement('div');
      div.className = 'text-entry';
      div.textContent = text;
      textList.appendChild(div);
    });
  });
}

// Function to save a new text entry
function saveText(newText) {
  chrome.storage.local.get(['texts'], (result) => {
    const texts = result.texts || [];
    texts.push(newText);
    chrome.storage.local.set({ texts }, () => {
      loadTexts();
    });
  });
}

// Event listener for the button click
document.getElementById('addTextButton').addEventListener('click', () => {
  const input = document.getElementById('textInput');
  const newText = input.value.trim();
  if (newText) {
    saveText(newText);
    input.value = '';
  }
});

// Load texts when the page is loaded
document.addEventListener('DOMContentLoaded', loadTexts);
