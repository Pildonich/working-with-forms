(function () {
  // Работа с localStage
  function save(data) {
    localStorage.setItem('form', JSON.stringify(data));
  }

  function onChange(evt) {
    let element = evt.target;
    let name = element.name;
    let value = element.value;
    data[name] = value;
    save(data);
  }

  let data = localStorage.getItem('form');
  let dataForm = document.querySelectorAll('[name]');

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
