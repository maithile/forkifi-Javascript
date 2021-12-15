import icons from '../../img/icons.svg';
import { Views } from './Views.js';

class resultsView extends Views {
  _parentElement = document.querySelector('.results');
  _errMessage = 'Culd not find that recipe. Plase try another';
  _messSuceed = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPre).join();
  }
  _generateMarkupPre(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview ${
      result.id === id ? 'preview__link--active' : ''
    }">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.img}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      </div>
    </a>
  </li> `;
  }
}
export default new resultsView();
