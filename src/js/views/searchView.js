class searchView {
  _parentEl = document.querySelector('.search');
  _inputSearch = document.querySelector('.search__field');
  _errMessage = 'no query';

  getValue() {
    const query = this._inputSearch.value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this._inputSearch.value = '';
  }
  addHandleSearch(handle) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      handle();
    });
  }
}

export default new searchView();
