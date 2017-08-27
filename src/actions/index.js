import axios from 'axios';
export const FETCH_POSTS = Symbol('fetch_posts');
export const CREATE_POST = Symbol('create_post');
export const FETCH_POST = Symbol('fetch_post');
export const DELETE_POST = Symbol('delete_post');

const ROOT_URL = 'https://kodaktor.ru/api';
const API_KEY = '?key=ooo';

//функция, экспортируемая по умолчанию
//для маршрута '/' и выдаёт список всех постов
export default () => {

  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  }
}


export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}
