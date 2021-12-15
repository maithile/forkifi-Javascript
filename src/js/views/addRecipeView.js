import icons from '../../img/icons.svg';
import { Views } from './Views.js';

class addRecipeView extends Views {
  _parentElement = document.querySelector('.upload');
  _messSuceed = 'Recipe uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandleOpenmodel();
    this._addHandlerHiddenWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    if (!this._window.classList.contains('hidden')) {
      this._parentElement.innerHTML = this._generateMarkup();
    }
  }
  _addHandleOpenmodel() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHiddenWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandleUpload(handle) {
    // gan su kien cho button
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const objData = Object.fromEntries(data);
      handle(objData);
    });
  }
  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST5454" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST5454" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST5454" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST5454" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
</div>
 
<div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input value="0.5,kg,Rice" type="text" required name="ingredient-1" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 2</label>
    <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 3</label>
    <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 4</label>
    <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 5</label>
    <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 6</label>
    <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
</div>
 
<button class="btn upload__btn">
<svg>
<use href="src/img/icons.svg#icon-upload-cloud"></use>
</svg>
<span>Upload</span>
</button>`;
  }
  // _generateMarkup() {
  //   return `<figure class="recipe__fig">
  //   <img src="${this._data.img}" alt="Tomato" class="recipe__img" />
  //   <h1 class="recipe__title">
  //     <span>${this._data.title}</span>
  //   </h1>
  // </figure>
  // <div class="recipe__details">
  //   <div class="recipe__info">
  //     <svg class="recipe__info-icon">
  //       <use href="${icons}#icon-clock"></use>
  //     </svg>
  //     <span class="recipe__info-data recipe__info-data--minutes">${
  //       this._data.cookingTime
  //     }</span>
  //     <span class="recipe__info-text">minutes</span>
  //   </div>
  //   <div class="recipe__info">
  //     <svg class="recipe__info-icon">
  //       <use href="${icons}#icon-users"></use>
  //     </svg>
  //     <span class="recipe__info-data recipe__info-data--people">${
  //       this._data.servings
  //     }</span>
  //     <span class="recipe__info-text">servings</span>
  //     <div class="recipe__info-buttons">
  //       <button data-update-to="${this._data.servings - 1}"
  //       class="btn--tiny btn--update-servings" >
  //         <svg>
  //           <use href="${icons}#icon-minus-circle"></use>
  //         </svg>
  //       </button>
  //       <button data-update-to="${
  //         this._data.servings + 1
  //       }" class="btn--tiny btn--update-servings" >
  //         <svg>
  //           <use href="${icons}#icon-plus-circle"></use>
  //         </svg>
  //       </button>
  //     </div>
  //   </div>
  //   <div class="recipe__user-generated">
  //   </div>
  //   <button class="btn--round btn--bookmark">
  //     <svg class="">
  //       <use href="${icons}#icon-bookmark${
  //     this._data.bookmarked ? '-fill' : ''
  //   }"></use>
  //     </svg>
  //   </button>
  // </div>
  // <div class="recipe__ingredients">
  //   <h2 class="heading--2">Recipe ingredients</h2>
  //   <ul class="recipe__ingredient-list">
  //   ${this._data.ingredients.map(this._generateIngrediens).join('')}
  //   </ul>
  // </div>

  // <div class="recipe__directions">
  //   <h2 class="heading--2">How to cook it</h2>
  //   <p class="recipe__directions-text">
  //     This recipe was carefully designed and tested by
  //     <span class="recipe__publisher">${1}</span>. Please check out
  //     directions at their website.
  //   </p>
  //   <a
  //     class="btn--small recipe__btn"
  //     href="${this._data.sourceUrl}"
  //     target="_blank"
  //   >
  //     <span>Directions</span>
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-right"></use>
  //     </svg>
  //   </a>
  // </div>`;
  // }
}
export default new addRecipeView();

// 1. gan su kien click
// 2. hien thi form
// 3. lay du lieu input  -model
// 4. insert vao API     -model
