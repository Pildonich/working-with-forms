'use strict';

(function () {
  // Блокировка формы и анимация
  function animationToggle() {
    document.querySelector('.animation').classList.toggle('animation--show');
  }

  function blockForm() {
    animationToggle();
    for (var i = 0; i < window.storage.data.length; i++) {
      window.storage.data[i].disabled = true;
    }
  }

  function unBlockForm() {
    animationToggle();
    for (var i = 0; i < window.storage.data.length; i++) {
      window.storage.data[i].disabled = false;
    }
  }

  window.animationLoader = {
    start: blockForm,
    end: unBlockForm
  };
})();
'use strict';

(function () {
  // Promise эмуляция отправки данных
  var DELAY = 2000;

  function checkFormPromise() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        window.validation.check();
        var errors = document.querySelector('.error');
        !errors ? resolve() : reject('Заполните все поля правильно!');
        window.animationLoader.end();
      }, DELAY);
    });
  }

  var submit = document.querySelector('.form__btn');

  if (submit) {
    submit.addEventListener('click', function () {
      window.validation.hideError();
      window.animationLoader.start();
      checkFormPromise().then(window.service.openWindow).catch(window.service.popUpToggle);
    });
  }
})();
'use strict';

(function () {
  // Всплывающее окно, переход на новую страницу
  var ESC = 27;

  function openWindow() {
    window.open('thank-you.html');
  }

  function closeWindow() {
    window.close();
  }

  function popUpToggle() {
    popUp.classList.toggle('pop-up--show');
  }

  var popUpWrapper = document.querySelector('.pop-up__wrapper');
  var popUp = document.querySelector('.pop-up');
  var close = document.querySelector('.pop-up__btn');
  var closeWindowBtn = document.querySelector('.thanks__btn');

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
'use strict';

(function () {
  // Работа с localStage
  function save(data) {
    localStorage.setItem('form', JSON.stringify(data));
  }

  function onChange(evt) {
    var element = evt.target;
    var name = element.name;
    var value = element.value;
    data[name] = value;
    save(data);
  }

  var data = localStorage.getItem('form');
  var dataForm = document.querySelectorAll('[name]');

  if (data) {
    data = JSON.parse(data);
  } else {
    save(data = {});
  }
  // Если в localStage есть данные, внести их в формы
  Array.prototype.forEach.call(dataForm, function (evt) {
    if (data[evt.name] === evt.value) {
      evt.checked = true;
    } else if (evt.name === 'name') {
      evt.value = data.name || '';
    } else if (evt.name === 'surname') {
      evt.value = data.surname || '';
    } else if (evt.name === 'favorite-music') {
      evt.value = data['favorite-music'];
    }
    evt.addEventListener('change', onChange);
  });

  window.storage = {
    data: dataForm
  };
})();
'use strict';

(function () {
  // Создание ошибок
  function generateError(text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
  }

  function showError(error, errorPlace) {
    var place = document.querySelector(errorPlace);
    place.parentElement.insertBefore(error, place);
  }

  function hideError() {
    var errors = document.querySelectorAll('.error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }

  // Валидация форм
  function checkInputText(field, errorPlace, errorText) {
    var textValue = document.querySelector(field).value;
    var regExp = /^[а-яА-ЯёЁ]{2,}$/;
    if (!regExp.test(textValue)) {
      var error = generateError(errorText);
      showError(error, errorPlace);
    }
  }

  function checkInputRadio(field, errorPlace, errorText) {
    var favoriteNumber = document.getElementsByName(field);
    if (!Array.prototype.filter.call(favoriteNumber, function (elem) {
      return elem.checked;
    }).length) {
      var error = generateError(errorText);
      showError(error, errorPlace);
    }
  }

  function checkSelect(field, errorPlace, errorText) {
    var favoriteMusic = document.querySelector(field).value;
    if (!favoriteMusic) {
      var error = generateError(errorText);
      showError(error, errorPlace);
    }
  }

  function checkForm() {
    checkInputText('.form__name', '.form__wrapper-name', 'Имя должно состоять только из русских букв и иметь длинну более 2х символов');
    checkInputText('.form__surname', '.form__wrapper-surname', 'Фамилия должна состоять только из русских букв и иметь длинну более 2х символов');
    checkInputRadio('favorite-number', '.form__wrapper-favorite-number', 'Выбирите любимую цифру');
    checkInputRadio('favorite-color', '.form__wrapper-favorite-color', 'Выбирите любимый цвет');
    checkSelect('.form__favorite-music', '.form__wrapper-favorite-music', 'Выбирите любимого музыкального исполнителя');
  }

  window.validation = {
    check: checkForm,
    hideError: hideError
  };
})();