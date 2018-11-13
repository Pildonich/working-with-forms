(function () {
  // Создание ошибок
  function generateError(text) {
    let error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
  }

  function showError(error, errorPlace) {
    let place = document.querySelector(errorPlace);
    place.parentElement.insertBefore(error, place);
  }

  function hideError() {
    let errors = document.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }

  // Валидация форм
  function checkInputText(field, errorPlace, errorText) {
    let textValue = document.querySelector(field).value;
    let regExp = /^[а-яА-ЯёЁ]{2,}$/;
    if (!regExp.test(textValue)) {
      let error = generateError(errorText);
      showError(error, errorPlace);
    }
  }

  function checkInputRadio(field, errorPlace, errorText) {
    let favoriteNumber = document.getElementsByName(field);
    if (!Array.prototype.filter.call(favoriteNumber, function (elem) {
      return elem.checked;
    }).length) {
      let error = generateError(errorText);
      showError(error, errorPlace);
    }
  }

  function checkSelect(field, errorPlace, errorText) {
    let favoriteMusic = document.querySelector(field).value;
    if (!favoriteMusic) {
      let error = generateError(errorText);
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
