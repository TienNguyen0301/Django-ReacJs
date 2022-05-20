import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Apis, { endpoints } from '../configs/Apis'
import cookies from 'react-cookies';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

function Admin() {
  
  const [posts, setPosts] = useState([])
  // const user = useSelector(state => state.user.user)

  useEffect(() => {
    let loadPosts = async () => {
      try {
        let res = await Apis.get(endpoints['posts'])
        setPosts(res.data)
      }catch(err) {
        console.error(err)
      }
    }
    loadPosts()
    
  }, [])

  return (
    <>
    <Header/>
    <div style={{ width: '80%', margin: '0 auto' }}>

      <h1 style={{ color: 'red'}}>ADMIN</h1>
      <Row>
        <Col md={5} xs={12}>
            <h3>menu</h3>
        </Col>
        <Col md={7} xs={12}>
            <h3>nội dung</h3>
            <br/>
            <p>Thống kê số bài viết: {posts.count}</p>

        </Col>
      </Row>
    </div>
    <Footer/>
    </>
)
}

export default Admin

