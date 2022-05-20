import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
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





export default function PageHashTag() {
    let user = useSelector(state => state.user.user)
    const [changed, setChanged] = useState(1)
    const [posts, setPosts] = useState([])
    const [del, setDel] = useState([])
    let { postId } = useParams()
    let { hashtag } = useParams()
    console.log(hashtag)

    let x = '%23' + hashtag

    useEffect(() => {
      let loadPosts = async () => {

        try {
          let res = await Apis.get(endpoints['posts'])

          let res2 = await Apis.get(endpoints['HashTagViewSet'](x))
          
          console.log(res2.data)
          let postHashtag = []

          for (let post in res2.data.post) {
            for (let x in res.data.results) {
              if (res2.data.post[post] == res.data.results[x].post_id) {
                postHashtag.push(res.data.results[x])
              }
            }
            
          }


          // for (let x in res.data.results) {
          // //    console.log(res.data.results[x])
          //    if (res.data.results[x]['user']['username'] == username ) {
          //     postUser.push(res.data.results[x])
          //    } 
          //   }
          setPosts(postHashtag)
          console.log(postHashtag)
        }catch(err) {
          console.error(err)
        }
      }

      loadPosts()
      

      
    },[changed])

    

  return (
    <>
      <Header />
      <div style={{ 'background': '#f4f2f2' }}>
        <Container>
          <h1 className='text-success'>HASHTAG PAGE</h1>
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
                            {/* { deleteUser == true &&
                                <div className='btnDel' > 
                                    <p onClick={event => deletePost(event, post.post_id)}>x</p>
                                </div>
                            }    */}

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
