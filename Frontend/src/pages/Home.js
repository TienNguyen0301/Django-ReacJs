import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Post from './Post';
import cookies from 'react-cookies';
import { Button, Form } from 'react-bootstrap';

export default function Home() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [auctioneer, setAuctioneer] = useState()
    const image = useRef()
    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user.user)
    const [changed, setChanged] = useState(1)

    let path = `/homedetail/${user.username}/`

    const NewPost = async (event) => {
        event.preventDefault()
  
        let formData = new FormData()
        let fileInputElement=document.getElementById("uploadImage")
        formData.append("title", title)
        formData.append("content", content)
        formData.append("user", user)
        formData.append("auctioneer", auctioneer)
        formData.append("image", fileInputElement.files[0] )


    
        try {
            let res = await Apis.post(endpoints['uppost'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${cookies.load('access_token')}`
                }
            })
        
            posts.push(res.data)
            
            try {
                let res = await Apis.get(endpoints['posts'])
                setPosts(res.data.results)
              }catch(err) {
                console.error(err)
              }
              setChanged(posts.length)


            console.info(res.data)
        } catch (err) {
            console.error(err)
            console.log("up bai k dc")
        }
        
    
    }

    useEffect(() => {
      let loadPosts = async () => {
        try {
          let res = await Apis.get(endpoints['posts'])
          setPosts(res.data.results)
        }catch(err) {
          console.error(err)
        }
        setChanged(posts.length)
      }

      loadPosts()
      

      
    },[changed])
    let p = <> </>
    let avt = <> </>
    let homeavt = <></>
      if (user !== null && user != undefined) {
          p = 
        <div className="central-meta">
        <div className="new-postbox">
            <figure>
                <img src={user.avatar} alt="" style={{'height': '60px', 'width':'60px'}}/>
            </figure>
            <div className="newpst-input">
                <Form className='card-body' onSubmit={NewPost} >
                    <AddPostForm className="form-control" id='title'  
                            type='text'  value={title} lable='Title'
                            change={(event) => setTitle(event.target.value)} />
                    <AddPostForm className="form-control" id='content'  
                            type='text'  value={content} lable='Content'
                            change={(event) => setContent(event.target.value)} />
                    <AddPostForm className="form-control" id='auctioneer'  
                            type='text'  value={auctioneer} lable='Auctioneer'
                            change={(event) => setAuctioneer(event.target.value)} />
                    <Form.Group className='mb-3' controlId='avatar'>
                        <Form.Control type='file' rel={image} id='uploadImage' className='form-control'/>
                    </Form.Group>
                    <div className="form-group">
                        <Button className='btn login_btn btn-register' type='submit' >Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    }
    if (user !== null && user != undefined) {
        avt = <a href="#" title=""><img src={user.avatar} alt="" style={{'height': '60px','width':'60px' }}/></a>
        homeavt =  <Link className='img-user' to={path}>
                        <p className="underline">My Page</p>
                    </Link>
  }
    return (
        <>
        <Header />
        <div className="col-lg-12" style={{'padding-top': '60px', 'background': '#f4f2f2'}}>
            <div className="row" id="page-contents">
                <div className="col-lg-3">
                    <aside className="sidebar static">
                        <div className="widget">
                            <h4 className="widget-title">Shortcuts</h4>
                            <ul className="naves">
                                <li>
                                    <i className="ti-clipboard"></i>
                                    <a href="newsfeed.html" title="">News feed</a>
                                </li>
                                <li>
                                    <i className="ti-mouse-alt"></i>
                                    <a href="inbox.html" title="">Inbox</a>
                                </li>
                                <li>
                                    <i className="ti-files"></i>
                                    <a href="fav-page.html" title="">My pages</a>
                                </li>
                                <li>
                                    <i className="ti-user"></i>
                                    <a href="timeline-friends.html" title="">friends</a>
                                </li>
                                <li>
                                    <i className="ti-image"></i>
                                    <a href="timeline-photos.html" title="">static/images</a>
                                </li>
                                <li>
                                    <i className="ti-video-camera"></i>
                                    <a href="timeline-videos.html" title="">videos</a>
                                </li>
                                <li>
                                    <i className="ti-comments-smiley"></i>
                                    <a href="messages.html" title="">Messages</a>
                                </li>
                                <li>
                                    <i className="ti-bell"></i>
                                    <a href="notifications.html" title="">Notifications</a>
                                </li>
                                <li>
                                    <i className="ti-share"></i>
                                    <a href="people-nearby.html" title="">People Nearby</a>
                                </li>
                                <li>
                                    <i className="fa fa-bar-chart-o"></i>
                                    <a href="insights.html" title="">insights</a>
                                </li>
                                <li>
                                    <i className="ti-power-off"></i>
                                    <a href="landing.html" title="">Logout</a>
                                </li>
                            </ul>
                        </div>
                        <div className="widget">
                            <h4 className="widget-title">Recent Activity</h4>
                            <ul className="activitiez">
                                <li>
                                    <div className="activity-meta">
                                        <i>10 hours Ago</i>
                                        <span><a href="#" title="">Commented on Video posted </a></span>
                                        <h6>by <a href="time-line.html">black demon.</a></h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="activity-meta">
                                        <i>30 Days Ago</i>
                                        <span><a href="#" title="">Posted your status. “Hello guys, how are you?”</a></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="activity-meta">
                                        <i>2 Years Ago</i>
                                        <span><a href="#" title="">Share a video on her timeline.</a></span>
                                        <h6>"<a href="#">you are so funny mr.been.</a>"</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="widget stick-widget">
                            <h4 className="widget-title">Who's follownig</h4>
                            <ul className="followers">
                                <li>
                                    <figure><img src="static/images/resources/friend-avatar2.jpg" alt="" /></figure>
                                    <div className="friend-meta">
                                        <h4><a href="time-line.html" title="">Kelly Bill</a></h4>
                                        <a href="#" title="" className="underline">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                    <figure><img src="static/images/resources/friend-avatar4.jpg" alt="" /></figure>
                                    <div className="friend-meta">
                                        <h4><a href="time-line.html" title="">Issabel</a></h4>
                                        <a href="#" title="" className="underline">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                    <figure><img src="static/images/resources/friend-avatar6.jpg" alt="" /></figure>
                                    <div className="friend-meta">
                                        <h4><a href="time-line.html" title="">Andrew</a></h4>
                                        <a href="#" title="" className="underline">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                    <figure><img src="static/images/resources/friend-avatar8.jpg" alt="" /></figure>
                                    <div className="friend-meta">
                                        <h4><a href="time-line.html" title="">Sophia</a></h4>
                                        <a href="#" title="" className="underline">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                    <figure><img src="static/images/resources/friend-avatar3.jpg" alt="" /></figure>
                                    <div className="friend-meta">
                                        <h4><a href="time-line.html" title="">Allen</a></h4>
                                        <a href="#" title="" className="underline">Add Friend</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>

                <div className="col-lg-6">
                    <div>{p}</div>
                    {posts.map(c => <Post obj={c} />)}
                </div>
                <div className="col-lg-3">
                    <aside className="sidebar static">
                        <div className="widget">
                            <h4 className="widget-title">Your page</h4>
                            <div className="your-page">
                                <figure>
                                   {avt}
                                </figure>
                                <div className="page-meta">
                                    {homeavt}
                                    <span><i className="ti-comment"></i><a href="insight.html" title="">Messages <em>9</em></a></span>
                                    <span><i className="ti-bell"></i><a href="insight.html" title="">Notifications <em>2</em></a></span>
                                </div>
                                <div className="page-likes">
                                    <ul className="nav nav-tabs likes-btn">
                                        <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">likes</a></li>
                                        <li className="nav-item"><a className="" href="#link2" data-toggle="tab">views</a></li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane active fade show " id="link1" >
                                            <span><i className="ti-heart"></i>884</span>
                                            <a href="#" title="weekly-likes">35 new likes this week</a>
                                            <div className="users-thumb-list">
                                                <a href="#" title="Anderw" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-1.jpg" alt="" />
                                                </a>
                                                <a href="#" title="frank" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-2.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Sara" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-3.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Amy" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-4.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Ema" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-5.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Sophie" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-6.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Maria" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-7.jpg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="link2" >
                                            <span><i className="ti-eye"></i>440</span>
                                            <a href="#" title="weekly-likes">440 new views this week</a>
                                            <div className="users-thumb-list">
                                                <a href="#" title="Anderw" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-1.jpg" alt="" />
                                                </a>
                                                <a href="#" title="frank" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-2.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Sara" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-3.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Amy" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-4.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Ema" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-5.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Sophie" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-6.jpg" alt="" />
                                                </a>
                                                <a href="#" title="Maria" data-toggle="tooltip">
                                                    <img src="static/images/resources/userlist-7.jpg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget">
                            <div className="banner medium-opacity bluesh">
                                <div className="bg-image" ></div>
                                <div className="baner-top">
                                    <span><img alt="" src="static/images/book-icon.png" /></span>
                                    <i className="fa fa-ellipsis-h"></i>
                                </div>
                                <div className="banermeta">
                                    <p>
                                        create your own favourit page.
                                    </p>
                                    <span>like them all</span>
                                    <a data-ripple="" title="" href="#">start now!</a>
                                </div>
                            </div>
                        </div>
                        <div className="widget friend-list stick-widget">
                            <h4 className="widget-title">Friends</h4>
                            <div id="searchDir"></div>
                            <ul id="people-list" className="friendz-list">
                                <li>
                                    <figure>
                                        <img src="static/images/resources/friend-avatar.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">bucky barnes</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f2859b9c869780819d9e969780b2959f939b9edc919d9f">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>
                                    <figure>
                                        <img src="static/images/resources/friend-avatar2.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">Sarah Loren</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="ea888b98848f99aa8d878b8386c4898587">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>
                                    <figure>
                                        <img src="static/images/resources/friend-avatar3.jpg" alt="" />
                                        <span className="status f-off"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">jason borne</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="2d474c5e42434f6d4a404c4441034e4240">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>
                                    <figure>
                                        <img src="static/images/resources/friend-avatar4.jpg" alt="" />
                                        <span className="status f-off"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">Cameron diaz</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6802091b07060a280f05090104460b0705">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>

                                    <figure>
                                        <img src="static/images/resources/friend-avatar5.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">daniel warber</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4e242f3d21202c0e29232f2722602d2123">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>

                                    <figure>
                                        <img src="static/images/resources/friend-avatar6.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">andrew</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="1872796b77767a587f75797174367b7775">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>

                                    <figure>
                                        <img src="static/images/resources/friend-avatar7.jpg" alt="" />
                                        <span className="status f-off"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">amy watson</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="711b10021e1f1331161c10181d5f121e1c">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>

                                    <figure>
                                        <img src="static/images/resources/friend-avatar5.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">daniel warber</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="234942504c4d4163444e424a4f0d404c4e">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                                <li>

                                    <figure>
                                        <img src="static/images/resources/friend-avatar2.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="time-line.html">Sarah Loren</a>
                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d5b7b4a7bbb0a695b2b8b4bcb9fbb6bab8">[email&#160;protected]</a></i>
                                    </div>
                                </li>
                            </ul>
                            <div className="chat-box">
                                <div className="chat-head">
                                    <span className="status f-online"></span>
                                    <h6>Bucky Barnes</h6>
                                    <div className="more">
                                        <span><i className="ti-more-alt"></i></span>
                                        <span className="close-mesage"><i className="ti-close"></i></span>
                                    </div>
                                </div>
                                <div className="chat-list">
                                    <ul>
                                        <li className="me">
                                            <div className="chat-thumb"><img src="static/images/resources/chatlist1.jpg" alt="" /></div>
                                            <div className="notification-event">
                                                <span className="chat-message-item">
                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                </span>
                                                <span className="notification-date"><time datetime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                            </div>
                                        </li>
                                        <li className="you">
                                            <div className="chat-thumb"><img src="static/images/resources/chatlist2.jpg" alt="" /></div>
                                            <div className="notification-event">
                                                <span className="chat-message-item">
                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                </span>
                                                <span className="notification-date"><time datetime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                            </div>
                                        </li>
                                        <li className="me">
                                            <div className="chat-thumb"><img src="static/images/resources/chatlist1.jpg" alt="" /></div>
                                            <div className="notification-event">
                                                <span className="chat-message-item">
                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                </span>
                                                <span className="notification-date"><time datetime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                            </div>
                                        </li>
                                    </ul>
                                    <form className="text-box">
                                        <textarea placeholder="Post enter to post..."></textarea>
                                        <div className="add-smiles">
                                            <span title="add icon" className="em em-expressionless"></span>
                                        </div>
                                        <div className="smiles-bunch">
                                            <i className="em em---1"></i>
                                            <i className="em em-smiley"></i>
                                            <i className="em em-anguished"></i>
                                            <i className="em em-laughing"></i>
                                            <i className="em em-angry"></i>
                                            <i className="em em-astonished"></i>
                                            <i className="em em-blush"></i>
                                            <i className="em em-disappointed"></i>
                                            <i className="em em-worried"></i>
                                            <i className="em em-kissing_heart"></i>
                                            <i className="em em-rage"></i>
                                            <i className="em em-stuck_out_tongue"></i>
                                        </div>
                                        <button type="submit"></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
function AddPostForm(props){
    return(
        <input type={props.type} className="form-control" id={props.id}
        value={props.value}
        placeholder={props.lable}
        onChange={props.change} />

    )
}