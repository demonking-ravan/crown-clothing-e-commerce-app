import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

export const setCategoriesMap = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesArray);

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments()
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        dispatch(fetchCategoriesFailed(error));
    }
}