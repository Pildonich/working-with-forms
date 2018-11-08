(function () {
  if (window.localStorage) {
    var save = function (data) {
      localStorage.setItem('form', JSON.stringify(data));
    }

    var onChange = function (evt) {
      var element = evt.target;
      var name = element.name;
      var value = element.value;
      data[name] = value;
      save(data);
    }

    var checkForm = function (evt) {
      
      var elements = document.querySelectorAll("input[type=text]");
      for (var i = 0; i < elements.length; i++) {
          elements[i].oninvalid = function(evt) {
              evt.target.setCustomValidity("");
              if (!evt.target.validity.valid) {
                  evt.target.setCustomValidity("Имя и фамилия должны состоять только из русских букв и иметь длинну не менее 2х");
                  
              }
          };
          elements[i].oninput = function(evt) {
              evt.target.setCustomValidity("");
          };
      }
    }
    
    var dataForm = document.querySelectorAll('[name]');
    var data = localStorage.getItem('form');
    var btn = document.querySelector('.btn');

    btn.addEventListener("click", checkForm);

    if(data) { 
      data = JSON.parse(data);
    } else {
      save(data = {});
    }

    Array.prototype.forEach.call(dataForm, function(evt) {
      if (data[evt.name] === evt.value) { 
        evt.checked = true;
      } else if (evt.name === 'name') {
        evt.value = data.name || '';
      } else if (evt.name === 'surname') {
        evt.value = data.surname || '';
      } else if (evt.name === 'favorite-music') {
        evt.value = data['favorite-music'];
      }
      evt.addEventListener("change", onChange); 
    });



  }
})();
