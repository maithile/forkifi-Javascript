import icons from '../../img/icons.svg';
import { Views } from './Views.js';

class paginationViews extends Views {
  _parentElement = document.querySelector('.pagination');
  addhandlePagination(arg) {
    // 1. gan su kien cho thang cha
    this._parentElement.addEventListener('click', function (e) {
      // 2. matching voi tang con
      const btn = e.target.closest('.btn--inline'); // vi kich
      // get page
      if (!btn) return;
      const getPage = +btn.dataset.goto;
      arg(getPage);
    });
  }
  _nextBtn(cur) {
    return `<button class="btn--inline pagination__btn--next" data-goto="${
      cur + 1
    }">
      <span>Page ${cur + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }
  _prevBtn(cur) {
    return `<button class="btn--inline pagination__btn--prev" data-goto="${
      cur - 1
    }">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${cur - 1}</span>
  </button>`;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._nextBtn(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._prevBtn(curPage);
    }
    // Other page
    if (curPage < numPages) {
      return `${this._nextBtn(curPage)} ${this._prevBtn(curPage)}`;
    }
    // Page 1, and there are No othoer pages
    return '';
  }
}
export default new paginationViews();
