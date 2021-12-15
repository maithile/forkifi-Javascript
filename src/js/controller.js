'use strict';
import * as model from './model.js';
import { MODLE_TIMEOUT } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import 'regenerator-runtime/runtime'; // for ham bat dong bo
import 'core-js/stable';
///////////////////////////////////////
// get recipe
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // 0. update selectd
    resultsView.update(model.getSearchpagination());
    if (!id) return;
    recipeView.renderSpinner();
    bookmarkView.update(model.state.bookmarks);
    // 1. loading recipe
    await model.loadRecipe(id);
    // 2. render recipe
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};
// search
const controlSearchResults = async function () {
  try {
    // 1. get query
    const query = searchView.getValue();
    if (!query) return;
    resultsView.renderSpinner();
    // 2. load query
    await model.loadSearchResult(query);
    //3. reder html
    resultsView.render(model.getSearchpagination()); // la 1 laay
    paginationView.render(model.state.search); // pass ket qua
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (getPage) {
  resultsView.render(model.getSearchpagination(getPage));
  paginationView.render(model.state.search);
};
const controlServing = function (serUpdate) {
  model.updateServings(serUpdate);
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  // bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update
  recipeView.update(model.state.recipe);
  // render
  bookmarkView.render(model.state.bookmarks);
};
const controlLocalbookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlUpload = async function (data) {
  try {
    // show
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    // render recipe
    recipeView.render(model.state.recipe);
    // mess succed
    addRecipeView.renderMesssuced();

    // render bookmark
    bookmarkView.render(model.state.bookmarks);
    // changr ID in Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODLE_TIMEOUT * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};
// pub-sub
const init = function () {
  bookmarkView.addHandleLocalRender(controlLocalbookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandleUpdateServings(controlServing);
  recipeView.addHandleBookmark(controlBookmark);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addhandlePagination(controlPagination);
  addRecipeView.addHandleUpload(controlUpload);
};
init();
