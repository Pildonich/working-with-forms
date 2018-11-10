'use strict';

(function () {
  'use strict';

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

  function generateError(text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
  }

  function removeValidation() {
    var errors = document.querySelectorAll('.error');

    for (var i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }

  function checkInputText(input, showError, errorText) {
    var wrapperName = document.querySelector(showError);
    var textValue = document.querySelector(input).value;
    var regExp = /^[а-яА-ЯёЁ]{2,}$/;
    if (!regExp.test(textValue)) {
      var error = generateError(errorText);
      wrapperName.parentElement.insertBefore(error, wrapperName);
    }
  }

  function checkInputRadio(input, showError, errorText) {
    var wrapperName = document.querySelector(showError);
    var favoriteNumber = document.getElementsByName(input);
    if (!Array.prototype.filter.call(favoriteNumber, function (elem) {
      return elem.checked;
    }).length) {
      var error = generateError(errorText);
      wrapperName.parentElement.insertBefore(error, wrapperName);
    }
  }

  function checkMusic() {
    var wrapperName = document.querySelector('.wrapper-favorite-music');
    var favoriteMusic = document.querySelector('.favorite-music').value;
    if (!favoriteMusic) {
      var error = generateError('Выбирите любимого музыкального исполнителя');
      wrapperName.parentElement.insertBefore(error, wrapperName);
    }
  }

  var data = localStorage.getItem('form');

  if (data) {
    data = JSON.parse(data);
  } else {
    save(data = {});
  }

  var dataForm = document.querySelectorAll('[name]');

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

  function checkForm() {
    return !!(checkInputText('.name', '.wrapper-name', 'Имя должно состоять только из русских букв и иметь длинну более 2х символов') || checkInputText('.surname', '.wrapper-surname', 'Фамилия должна состоять только из русских букв и иметь длинну более 2х символов') || checkInputRadio('favorite-number', '.wrapper-favorite-number', 'Выбирите любимую цифру') || checkInputRadio('favorite-color', '.wrapper-favorite-color', 'Выбирите любимый цвет') || checkMusic());
  }

  function delay(t) {
    return new Promise(function (resolve, reject) {
      checkForm();
      if (checkForm() === true) {
        return setTimeout(resolve, t);
      } else {
        return setTimeout(reject, t);
      }
    });
  }

  function f() {
    console.log('test1');
  }

  function blockForm() {
    document.querySelector('.windows8').classList.add('windows8--show');
    for (var i = 0; i < dataForm.length; i++) {
      dataForm[i].disabled = true;
    }
  }

  function unBlockForm() {
    document.querySelector('.windows8').classList.remove('windows8--show');
    for (var i = 0; i < dataForm.length; i++) {
      dataForm[i].disabled = false;
    }
  }

  var submit = document.querySelector('.submit');

  submit.addEventListener('click', function () {
    removeValidation();
    blockForm();
    delay(3000).then(f, unBlockForm);
  });
})();