import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import './Body.css';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PostDetail from '../pages/PostDetail';
import Admin from '../pages/Admin';
import HomeUser from '../pages/HomeUser';
import PageHashTag from '../pages/PageHashTag';
import PostEdit from '../pages/PostEdit'



export default function Body() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path ='/' element ={<Home />} /> 
                    <Route  path ='/admin' element ={<Admin />} />
                    <Route  path ='/login' element ={<Login />} />
                    <Route  path ='/register' element ={<Register />} />
                    <Route  path ='/hashtag/:hashtag/' element ={<PageHashTag />} />
                    <Route  path ='/postdetail/:postId/' element ={<PostDetail />} />
                    <Route  path ='/homedetail/:username/' element ={<HomeUser />} />
                    <Route  path ='/editpost/:postId/' element ={<PostEdit/>} />
                </Routes> 
            </BrowserRouter>
       
    )
}