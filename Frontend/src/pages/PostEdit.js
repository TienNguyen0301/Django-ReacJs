import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Post from './Post';
import cookies from 'react-cookies';
import { Button, Form, Container } from 'react-bootstrap';





export default function UserPostEdit() {
    let user = useSelector(state => state.user.user)
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [auctioneer, setAuctioneer] = useState()
    const image = useRef()
    const [changed, setChanged] = useState(1)
    const [posts, setPosts] = useState([])
    const [del, setDel] = useState([])
    let { postId } = useParams()
    let { username } = useParams()




    useEffect(() => {
        let loadPosts = async () => {

          try {
            let res = await Apis.get(endpoints['posts'])
            let postUser = []

            for (let x in res.data.results) {
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


    const UpdatePost = async (event) => {
        event.preventDefault()
  
        let formData = new FormData()
        let fileInputElement=document.getElementById("uploadImage")
        formData.append("title", title)
        formData.append("content", content)
        formData.append("user", user)
        formData.append("auctioneer", auctioneer)
        formData.append("image", fileInputElement.files[0] )


    
        try {
            let res = await Apis.put(endpoints['postdetail'](postId), formData, {
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



  return (
    <>
      <Header />
      <div style={{ 'background': '#f4f2f2' }}>
        <Container>
          <h1 className='text-success'>Edit post</h1>
          <h3>{postId}</h3>
          <div className="central-meta">
                <div className="new-postbox">
                    <figure>
                        <img src={user.avatar} alt="" style={{'height': '60px', 'width':'60px'}}/>
                    </figure>
                    <div className="newpst-input">
                        <Form className='card-body' onSubmit={UpdatePost} >
                            <UpdatePostForm className="form-control" id='title'  
                                    type='text'  value={title} lable='Title'
                                    change={(event) => setTitle(event.target.value)} />
                            <UpdatePostForm className="form-control" id='content'  
                                    type='text'  value={content} lable='Content'
                                    change={(event) => setContent(event.target.value)} />
                            <UpdatePostForm className="form-control" id='auctioneer'  
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
        </Container>
      </div>
      <Footer />
    </>
  )
}
function UpdatePostForm(props){
    return(
        <input type={props.type} className="form-control" id={props.id}
        value={props.value}
        placeholder={props.lable}
        onChange={props.change} />

    )
}