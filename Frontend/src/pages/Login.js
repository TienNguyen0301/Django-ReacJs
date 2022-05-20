
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import './Login.css';
import { Form } from 'react-bootstrap';
import Apis, { endpoints } from '../configs/Apis';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../ActionCreators/UserCreators';
import cookies from 'react-cookies';



function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let user = useSelector(state => state.user.user)
  
  const login = async (event) => {
      event.preventDefault()

      try {
          let info = await Apis.get(endpoints['oauth2-info'])
          let res = await Apis.post(endpoints['login'], {
            'client_id': info.data.client_id,
            'client_secret': info.data.client_secret,
            'username': username,
            'password': password,
            'grant_type': 'password'
        })

       
        cookies.save('access_token', res.data.access_token)

        let user = await Apis.get(endpoints['current-user'], {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`,
          }
        })

        console.info(user)

        cookies.save('user', user.data)

        dispatch(loginUser(user.data))
          if(user.data.is_superuser === true){
            navigate('/admin')
        }
        else{
            navigate('/')
        }
        
      } catch(err) {
        console.error(err)
      }
  }

  


  return (

    <div className="test">
      <div className="login">
        <div className="login-left">
          <h1> FOR YOU</h1>
          <p>- Happiness does not exist in having or receiving, <br /> only happiness in giving -</p>
        </div>
        <div className="login-right">
          <div className="container">
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="card-header">
                  <h3>Sign In</h3>
                  <div className="d-flex justify-content-end social_icon">
                    <span><i className="fab fa-facebook-square"></i></span>
                    <span><i className="fab fa-google-plus-square"></i></span>
                    <span><i className="fab fa-twitter-square"></i></span>
                  </div>
                </div>

                <Form className='card-body' onSubmit={login}>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>

                    <input type="text" className="form-control"
                      value={username}
                      placeholder="username"
                      onChange={(event) => setUsername(event.target.value)} />
                  </div>

                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                    <input type="password" className="form-control"
                      value={password}
                      placeholder="password"
                      onChange={(event) => setPassword(event.target.value)} />

                  </div>
                  <div className="row align-items-center remember">
                    <input type="checkbox" />Remember Me
                  </div>
                  <div className="form-group">
                    
                    <button  className='btn float-right login_btn' type='submit'>Login</button>
                  </div>
                </Form>

                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    Don't have an account?<Link to="/register">Sign Up</Link>
                  </div>
                  <div className="d-flex justify-content-center">
                    <a href="#">Forgot your password?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;


