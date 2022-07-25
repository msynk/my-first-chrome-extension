let currentColor;
const selectedClassName = 'current';
const container = document.getElementById('container');
const randomizer = document.getElementById('randomizer');


randomizer.addEventListener('click', randomizeColors);
chrome.storage.sync.get('color', (data) => addButtons(data.color));

function randomizeColors() {
  container.innerHTML = '';
  addButtons();
}

function addButtons(initColor) {
  if (initColor) {
    currentColor = initColor;
  }

  for (let buttonColor of randomColors()) {
    let button = document.createElement('button');
    button.classList.add('color');
    button.dataset.color = buttonColor;
    button.style.backgroundColor = buttonColor;

    if (buttonColor === currentColor) {
      button.classList.add(selectedClassName);
    }

    button.addEventListener('click', handleButtonClick);
    container.appendChild(button);
  }
}

function randomColors() {
  return Array(10).fill().map(() => "#" + ((1 << 24) * Math.random() | 0).toString(16))
}

function handleButtonClick(e) {
  const target = e.target;
  const current = target.parentElement.querySelector(`.${selectedClassName}`);
  if (current && current !== target) {
    current.classList.remove(selectedClassName);
  }

  let color = target.dataset.color;
  target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}