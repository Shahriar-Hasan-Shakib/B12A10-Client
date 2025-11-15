// Routes
export const HOME = '/';
export const AUTH = '/auth';

export const ALL_MODELS = '/models';
export const ADD_MODEL = '/add-model';
export const MODEL_DETAILS = (id = 'id') => `/models/${id}`;
export const UPDATE_MODEL = (id = 'id') => `/update-model/${id}`;
export const DELETE_MODEL = (id = 'id') => `/delete-model/${id}`;
export const MY_MODELS = '/my-models';
export const MY_PURCHASES = '/my-purchases';
export const PURCHASE_MODEL = (id = 'id') => `/purchase-model/${id}`;

