
function getTime() {
  const time = document.querySelector('.time');
  let currentTime = new Date().toLocaleString();
  time.innerHTML = currentTime;
  console.log(currentTime)
}


function getUserInput() {
  const userInput = document.querySelector('.userInput');
  const button = document.querySelector('.button');
  button.addEventListener('click', (e) {
    console.log(e.target.value);
  })
}

