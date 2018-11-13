(function () {
  // Promise эмуляция отправки данных
  const DELAY = 2000;

  function checkFormPromise() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        window.validation.check();
        let errors = document.querySelector('.error');
        !errors ? resolve() : reject('Заполните все поля правильно!');
        window.animationLoader.end();
      }, DELAY);
    });
  }

  let submit = document.querySelector('.form__btn');

  if (submit) {
    submit.addEventListener('click', function () {
      window.validation.hideError();
      window.animationLoader.start();
      checkFormPromise()
        .then(window.service.openWindow)
        .catch(window.service.popUpToggle);
    });
  }
})();
