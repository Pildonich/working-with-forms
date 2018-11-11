(function () {
  const ESC = 27;

  function openWindow() {
    window.open('thank-you.html');
  }

  function closeWindow() {
    window.close();
  }

  function popUpToggle() {
    popUp.classList.toggle('pop-up--show');
  }

  let popUpWrapper = document.querySelector('.pop-up__wrapper');
  let popUp = document.querySelector('.pop-up');
  let close = document.querySelector('.close');
  let closeWindowBtn = document.querySelector('.close-window');

  if (popUpWrapper) {
    popUpWrapper.addEventListener('click', function () {
      popUpToggle();
    });
  }

  if (close) {
    close.addEventListener('click', popUpToggle);
  }

  if (closeWindowBtn) {
    closeWindowBtn.addEventListener('click', closeWindow);
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC) {
      evt.preventDefault();
      if (popUp.classList.contains('pop-up--show')) {
        popUpToggle();
      }
    }
  });

  window.service = {
    openWindow: openWindow,
    popUpToggle: popUpToggle
  };
})();
