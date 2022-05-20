import axios from "axios";
import { combineReducers } from "redux";

export let endpoints = {
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'posts': '/posts/',
    'post-detail': (postId) => `/postdetail/${postId}/`,
    'comments': (postId) => `/posts/${postId}/comments/`,
    'add-comment': (postId) => `/posts/${postId}/add-comment/`,
    'add-post': (postId) => `/posts/${postId}/add-post/`,
    'rating': (postId) => `/posts/${postId}/rating/`,
    'likes': '/likes/',
    'views': (postId) => `/posts/${postId}/views/`,
    'uppost': '/uppost/',
    'HashTagViewSet': (hashtag) => `/HashTagViewSet/${hashtag}/`,
    
}


export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

