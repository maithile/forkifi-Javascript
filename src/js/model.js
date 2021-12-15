import { async } from 'regenerator-runtime'; // for ham bat dong bo
import { API_URL, API_KEY, PER_PAGE } from './config.js';
import { AJAX } from './helpers';

/**
 *
 * @param {array} data recived from users
 * @returns object
 * @author maimit this is big challenggy for me
 */
const test = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    img: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    publisher: recipe.publisher,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
export const result = [];
export const loadRecipe = async function (id) {
  try {
    const getData = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
    state.recipe = test(getData);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};
/////// chuc nang search /////
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const getResult = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = getResult.data.recipes.map(rep => {
      return {
        id: rep.id,
        title: rep.title,
        img: rep.image_url,
        publisher: rep.publisher,
        ...(rep.key && { key: rep.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getSearchpagination = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  // if (!servings) return;
  state.recipe.ingredients.forEach(q => {
    q.quantity = (newServings * q.quantity) / state.recipe.servings;
    // update serving
  });
  state.recipe.servings = newServings;
};
const saveBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmarks = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);
  // mark current
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  saveBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  saveBookmark();
};
// getdataUpload
export const uploadRecipe = async function (newRecipe) {
  try {
    //1. convert to original objct
    // a, conver ingredients
    const ingredients = Object.entries(newRecipe)
      .filter(rep => rep[0].startsWith('ingredient') && rep[1] !== '')
      .map(rep => {
        const repOb = rep[1].split(',').map(el => el.trim());
        if (repOb.length !== 3) throw new Error('wrong ingredients');
        const repOb1 = Object.assign({}, repOb);
        return {
          quantity: repOb1[0] ? +repOb1[0] : null,
          unit: repOb1[1],
          description: repOb1[2],
        };
      });
    // b, convert to original
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // sending data to API
    const dataRep = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = test(dataRep);
    saveBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
// get book mark
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
// clear local store
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
