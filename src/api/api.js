import axios from 'axios';
// import Cookies from 'js-cookie'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:1111'
  : 'http://localhost:8080';

export const getPaper = (id) =>{
  return axios.get('/paperDetail/'+ id).then(res => res.data);
};

export const search = (text, mode, pageNumber, sortMode, perPage) =>{
  return axios.get('/search/' + text + '/' + mode + '?pageNumber=' + pageNumber + '&sortMode=' + sortMode + '&perPage=' + perPage).then(res => res.data);
};

export const getRank = (mode, pageNumber, descend, startYear, endYear) =>{
  return axios.get('/rank/' + mode + '?pageNumber=' + pageNumber + '&descend=' + descend + '&startYear=' + startYear + '&endYear=' + endYear).then(res => res.data);
};
