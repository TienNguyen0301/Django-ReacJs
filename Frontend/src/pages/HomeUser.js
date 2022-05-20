import React, { useEffect, useState, useCallback } from 'react'
import { Badge, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useParams, Link, useHistory  } from 'react-router-dom'
import Apis, { endpoints } from '../configs/Apis'
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Moment from 'react-moment';
import { Button } from 'bootstrap';
import { useSelector } from 'react-redux';
import cookies from 'react-cookies';
import Rating from 'react-rating';
import Post from './Post';
import './HomeUser.css';




export default function UserPostDetail() {
    let user = useSelector(state => state.user.user)
    const [changed, setChanged] = useState(1)
    const [posts, setPosts] = useState([])
    const [del, setDel] = useState([])
    let { postId } = useParams()
    let { username } = useParams()


    let isUser = false

    if (user.username == username) {
        isUser = true
    }

    useEffect(() => {
        let loadPosts = async () => {

          try {
            let res = await Apis.get(endpoints['posts'])
            let postUser = []

            for (let x in res.data.results) {
            //    console.log(res.data.results[x])
               if (res.data.results[x]['user']['username'] == username ) {
                postUser.push(res.data.results[x])
               } 
              }
            setPosts(postUser)
            console.log(postUser)
          }catch(err) {
            console.error(err)
          }
        }
  
        loadPosts()
        
  
        
      },[changed])


        const deletePost = async (event, post_id) => {
            event.preventDefault()

            try {
                let res = await Apis.delete(endpoints['post-detail'](post_id), {
                }, {
                headers: {
                    'Authorization': `Bearer ${cookies.load('access_token')}`
                }
        
                })
                posts.push(res.data)
                let postUser = []

                try {
                    let res = await Apis.get(endpoints['posts'])

                    for (let x in res.data.results) {
                    if (res.data.results[x]['user']['id'] == user.id ) {
                        postUser.push(res.data.results[x])
                    } 
                    }
                    setPosts(postUser)
                    console.log(postUser)
                }catch(err) {
                    console.error(err)
                }
        
                console.info(res.data)
                setChanged(postUser.length)
            
        
            } catch (err) {
                console.error(err)
            }

        }

            const editPost = async (event, post_id) => {
                event.preventDefault()
               window.location.href = `/editpost/${post_id}/`
            }
        

    

  return (
    <>
      <Header />
      <div style={{ 'background': '#f4f2f2' }}>
        <Container>
          <h1 className='text-success'>PageHome</h1>
          
          <div className="loadMore">
           
                { posts.map(post =>
                 <div className="central-meta item">
                    <div className="user-post" >
                        <div className="friend-info">
                            <figure>
                                <img src={post.user.avatar} alt="" style={{'height': '60px', 'width': '60px'}} />
                            </figure>
                            <div className="friend-name">
                                <ins><a title="">{post.user.first_name} {post.user.last_name}</a></ins>
                                <span>published: <Moment fromNow>{posts.created_date}</Moment></span>
                                
                            </div>


                            { isUser == true &&
                                <div className='btnEdit' > 
                                    <p onClick={event => editPost(event, post.post_id)}>edit</p>
                                </div>

                            }   

                            { isUser == true &&
                                <div className='btnDel' > 
                                    <p onClick={event => deletePost(event, post.post_id)}>x</p>
                                </div>

                            }


                            <div className="post-meta">
                                <h3>{post.title}</h3>
                                <Link to=''>
                                    <img src={post.image} alt="avatar" style={{width:'700px', height: '800px'}} />
                                </Link>
                                
                                <div className="description">

                                    <p>
                                        {post.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
                )}
           
        </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
