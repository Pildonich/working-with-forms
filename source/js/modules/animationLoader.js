(function () {
  function animationToggle() {
    document.querySelector('.animation').classList.toggle('animation--show');
  }

  function blockForm() {
    animationToggle();
    for (let i = 0; i < window.storage.data.length; i++) {
      window.storage.data[i].disabled = true;
    }
  }

  function unBlockForm() {
    animationToggle();
    for (let i = 0; i < window.storage.data.length; i++) {
      window.storage.data[i].disabled = false;
    }
  }

  window.animationLoader = {
    start: blockForm,
    end: unBlockForm
  };
})();
