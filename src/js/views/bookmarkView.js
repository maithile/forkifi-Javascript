import icons from '../../img/icons.svg';
import { Views } from './Views.js';

class bookMarkView extends Views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = 'Culd not find that recipe. Plase try another';
  _messSuceed = '';

  addHandleLocalRender(handle) {
    window.addEventListener('load', handle);
  }
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
      </div>
    </a>
  </li> `;
  }
}
export default new bookMarkView();
