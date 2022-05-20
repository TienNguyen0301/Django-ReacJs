
import React, { useRef , useState} from 'react';
import './Register.css';
import { Form , Button} from "react-bootstrap";
import Apis, { endpoints } from '../configs/Apis';
import { useNavigate } from 'react-router-dom';




export default function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    const navigate = useNavigate()

    
    const register = (event) => {
        event.preventDefault()
  
        let registerUser = async () => {
            let formData = new FormData()
            let fileInputElement=document.getElementById("uploadImage")
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("username", username)
            formData.append("avatar", fileInputElement.files[0] )
        
            try {
                await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                
                navigate('/login')
            } catch (err) {
                console.error(err)
            }
          
        }

        if (password !== null && password === confirmPassword) {
            registerUser()
        }
    }

  return (
    <div className="test">
    <div className="login">
      <div className="login-left">
        <h1> FOR YOU</h1>
        <p>- Happiness does not exist in having or receiving, <br /> only happiness in giving -</p>
      </div>
      <div className="login-right login-right-register">
          <div className="container">
            <div className="d-flex justify-content-center h-100">
              <div className="card card-register">
                <div className="card-header card-header-register">
                  <h3>Register</h3>
                </div>

                <Form className='card-body' onSubmit={register} >
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-drivers-license"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='firstName'  
                            type='text'  value={firstName} lable='Firstname'
                            change={(event) => setFirstName(event.target.value)} />

                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-drivers-license"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='lastName'  
                            type='text'  value={lastName} lable='Lastname'
                            change={(event) => setLastName(event.target.value)} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='email'  
                            type='email'  value={email} lable='Email'
                            change={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='username'  
                            type='text'  value={username} lable='Username'
                            change={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='password'  
                            type='password'  value={password} lable='Password'
                            change={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <RegisterForm className="form-control" id='confirm'  
                            type='password'  value={confirmPassword} lable='Confirm Password'
                            change={(event) => setConfirmPassword(event.target.value)} />
                    </div>
                    <Form.Group className='mb-3' controlId='avatar'>
                        <Form.Control type='file' rel={avatar} id='uploadImage' className='form-control'/>
                    </Form.Group>
                  <div className="form-group">
                    
                    <Button className='btn login_btn btn-register' type='submit'>Submit</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
    // <div className='form-register'> 
    //     <Form onSubmit={register}>
    //         <RegisterForm id='firstName' label='First Name' 
    //                       type='text'  value={firstName}
    //                       change={(event) => setFirstName(event.target.value)} />
    //         <RegisterForm id='lastName' label='Last Name' 
    //                       type='text'  value={lastName}
    //                       change={(event) => setLastName(event.target.value)} />
    //         <RegisterForm id='email' label='Email' 
    //                       type='email'  value={email}
    //                       change={(event) => setEmail(event.target.value)} />
    //         <RegisterForm id='username' label='Username' 
    //                       type='text'  value={username}
    //                       change={(event) => setUsername(event.target.value)} />
    //         <RegisterForm id='password' label='Password' 
    //                       type='password'  value={password}
    //                       change={(event) => setPassword(event.target.value)} />
    //         <RegisterForm id='confirm' label='Confirm Password' 
    //                       type='password'  value={confirmPassword}
    //                       change={(event) => setConfirmPassword(event.target.value)} />

    //         <Form.Group className='mb-3' controlId='avatar'>
    //             <Form.Label>Avatar</Form.Label>
    //             <Form.Control type='file' rel={avatar} id='uploadImage' className='form-control'/>
    //         </Form.Group>

    //         <Button variant='primary' type='submit'>
    //             Dang ky
    //         </Button>
    //     </Form>
    // </div>
  );
}

function RegisterForm(props){
    return(
        // <Form.Group className='mb-3' controlId={props.id}>
        //         <Form.Label>{props.label}</Form.Label>
        //         <Form.Control   type={props.type}
        //                         value={props.value}
        //                         onChange={props.change} />
        // </Form.Group>
        <input type={props.type} className="form-control" id={props.id}
        value={props.value}
        placeholder={props.lable}
        onChange={props.change} />

    )
}


