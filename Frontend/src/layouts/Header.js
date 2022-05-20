
import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'react-cookies';
import { logoutUser } from '../ActionCreators/UserCreators';

export default function Header() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const logout = (event) => {
        event.preventDefault()

        cookies.remove('access_token')
        cookies.remove('user')
        dispatch(logoutUser())
    }

    let path = <>
        <Link className='pad-10' to='/login'>Login</Link>
        <Link className='pad-10' to='/register'>Register</Link>

    </>
    if (user !== null && user != undefined){ 
        
        path = <>
            <div className='user-img'>
                <Link className='img-user' to='/'>
                    <img className='avt' src={ user.avatar} alt='avatar'/>{user.username}
                </Link>
            </div>
            <Link className='nav-link text-danger' to='#' onClick={logout}>Logout</Link>
        </>
    }
    return (   
        <div>
            <div class="topbar stick">
                <div class="logo">
                    <a title="" href="newsfeed.html"><img src={require('../static/image/logo-page.png')} style={{height: "55px"}} alt="" /></a>
                </div>

                <div class="top-area">
                    <ul class="setting-area">
                        <li className='top-15'>
                            <a href="#" title="Home" data-ripple=""><i class="ti-search"></i></a>
                            <div class="searched">
                                <form method="post" class="form-search">
                                    <input type="text" placeholder="Search Friend" />
                                        <button data-ripple><i class="ti-search"></i></button>
                                </form>
                            </div>
                        </li>
                        <li className='top-15'><a href="newsfeed.html" title="Home" data-ripple=""><i class="ti-home"></i></a></li>
                        <li className='top-15'>
                            <a href="#" title="Notification" data-ripple="">
                                <i class="ti-bell"></i><span>20</span>
                            </a>
                            <div class="dropdowns">
                                <span>4 New Notifications</span>
                                <ul class="drops-menu">
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src={require('../static/image/resources/thumb-1.jpg')} alt="" />
                                                <div class="mesg-meta">
                                                    <h6>sarah Loren</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-2.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Jhon doe</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-3.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Andrew</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-4.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Tom cruse</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-5.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Amy</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                </ul>
                                <a href="notifications.html" title="" class="more-mesg">view more</a>
                            </div>
                        </li>
                        <li className='top-15'>
                            <a href="#" title="Messages" data-ripple=""><i class="ti-comment"></i><span>12</span></a>
                            <div class="dropdowns">
                                <span>5 New Messages</span>
                                <ul class="drops-menu">
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-1.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>sarah Loren</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-2.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Jhon doe</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-3.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Andrew</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-4.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Tom cruse</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html" title="">
                                            <img src="src/static/image/resources/thumb-5.jpg" alt="" />
                                                <div class="mesg-meta">
                                                    <h6>Amy</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                        </a>
                                        <span class="tag">New</span>
                                    </li>
                                </ul>
                                <a href="messages.html" title="" class="more-mesg">view more</a>
                            </div>
                        </li>
                        <li className='top-10'>{path}</li>
                    </ul>
                   
                </div>
            </div>
        </div>
    )
}

