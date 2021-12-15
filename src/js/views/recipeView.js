import { Views } from './Views.js';
import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
class RecipeView extends Views {
  _parentElement = document.querySelector('.recipe');

  _errMessage = 'Can not load recipe, Please try another one';
  _messSuceed = '';
  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.img}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
      <div class="recipe__info-buttons">
        <button data-update-to="${this._data.servings - 1}"
        class="btn--tiny btn--update-servings" >
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-update-to="${
          this._data.servings + 1
        }" class="btn--tiny btn--update-servings" >
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateIngrediens).join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${1}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  addHandlerRender(argHander) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, argHander)
    );
  }
  addHandleUpdateServings(handle) {
    // gan su kien cho thang cha
    this._parentElement.addEventListener('click', function (e) {
      // matching voi thang con
      const btnUpdate = e.target.closest('.btn--update-servings');
      if (!btnUpdate) return;
      // get servings number and pass to controller
      const serUpdate = +btnUpdate.dataset.updateTo;
      if (serUpdate > 0) handle(serUpdate);
    });
  }
  addHandleBookmark(handle) {
    // gan su kien cho thang cha
    this._parentElement.addEventListener('click', function (e) {
      // mathcing voi thang con
      const btnBook = e.target.closest('.btn--bookmark');
      if (!btnBook) return;
      handle();
    });
  }
}
export default new RecipeView();
