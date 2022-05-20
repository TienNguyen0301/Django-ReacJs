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
import 'boxicons';




export default function PostDetail() {
  const [post, setPost] = useState(null)
  let { postId } = useParams()
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  const [commentContent, setCommentContent] = useState(null)
  const [rating, setRating] = useState(0)
  const [like, setLike] = useState([])
  const [changed, setChanged] = useState(1)
  let user = useSelector(state => state.user.user)
  var like_quantity = []



  useEffect(() => {
    let loadPostDetail = async () => {
      try {
        let res = await Apis.get(endpoints['post-detail'](postId), {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })

        setPost(res.data)
        setRating(res.data.rate)
      } catch (err) {
        console.error(err)
      }

    }

    let loadLikes = async () => {
      try {
        let res = await Apis.get(endpoints['likes'])
        console.info(res.data)

        let count = 0

        for (let x in res.data) {
          if (res.data[x]['post'] == postId) {
            count++;
          }
          // if (user !== null && user !== undefined) {
          //   if ((res.data[x]['post'] == postId) && (res.data[x]['user'] == user.id)) {

          //     const collection = document.getElementsByClassName("fa-thumbs-up");
          //     collection[0].style.color = "blue";
              
          //   }
          //   else {
          //     const collection = document.getElementsByClassName("fa-thumbs-up");
          //     collection[0].style.color = "black";

          //   }
          // }
        }

        setLikes(count)

      }
      catch (err) {
        console.error(err)
      }
    }

    let loadLikeUser = async () => {
      try {
        let res = await Apis.get(endpoints['likes'])
        console.info(res.data)

        let temp = false;

        for (let x in res.data) {
          if (user !== null && user !== undefined) {
            if ((res.data[x]['post'] == postId) && (res.data[x]['user'] == user.id)) {
                temp = true
              // const collection = document.getElementsByClassName("fa-thumbs-up");
              // collection[0].style.color = "blue";
              
            }
            // else {
            //   const collection = document.getElementsByClassName("fa-thumbs-up");
            //   collection[0].style.color = "black";

            // }
          }
        }

        if (temp) {
            const collection = document.getElementsByClassName("fa-thumbs-up");
            collection[0].style.color = "blue";
        }
        else {
            const collection = document.getElementsByClassName("fa-thumbs-up");
            collection[0].style.color = "black";
        }

      }
      catch (err) {
        console.error(err)
      }
    }

    let loadComments = async () => {
      try {
        let res = await Apis.get(endpoints['comments'](postId), {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })
        setComments(res.data)
        console.info(res.data)
      }
      catch (err) {
        console.error(err)
      }
    }

    loadComments()
    loadPostDetail()
    loadLikes()
    loadLikeUser()
  }, [changed])


  const addLike = async (event) => {
    event.preventDefault()

    try {
      let res = await Apis.post(endpoints['likes'], {
        'post': postId
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.load('access_token')}`
        }

      })

      like.push(res.data)

      let res2 = await Apis.get(endpoints['likes'])
      
      for (let x in res2.data) {
        if (user !== null && user !== undefined) {
          if ((res2.data[x]['post'] == postId) && (res2.data[x]['user'] == user.id)) {

            const collection = document.getElementsByClassName("fa-thumbs-up");
            collection[0].style.color = "blue";

          }
          else {
            const collection = document.getElementsByClassName("fa-thumbs-up");
            collection[0].style.color = "black";

          }
        }
      }


      console.info(res.data)
      like.push(res2.data)
      setLike(like)
      setChanged(like.length)
   

    } catch (err) {
      console.error(err)
    }
    
  }


  const addComment = async (event) => {
    event.preventDefault()

    try {
      let res = await Apis.post(endpoints['add-comment'](postId), {
        'content': commentContent
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.load('access_token')}`
        }
      })

      console.info(res.data)
      comments.push(res.data)

      try {
        let res = await Apis.get(endpoints['comments'](postId), {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })
        setComments(res.data)
        console.info(res.data)
      }
      catch (err) {
        console.error(err)
      }


      setChanged(comments.length)

    } catch (err) {
      console.error(err)
    }
  }




  



  const saveRating = async (rate) => {
    if (window.confirm('Ban muon danh gia bai hoc nay?') == true) {
      try {
        let res = await Apis.post(endpoints['rating'](postId), {
          'rating': rate
        }, {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })
        console.info(res.data)
      } catch (err) {
        console.error(err)
      }
    }
  }



  if (post === null)
    return <Spinner animation='border' />

  let comment = <em><Link to='/login'> Đăng nhập </Link> để hình luận </em>
  let r = ""
  let l = ""
  let avt = ""


  if (user !== null && user !== undefined) {
    comment = <Form onSubmit={addComment}>
      <Form.Group className="mb-3" controlId="comentContent">
        <Form.Control as="textarea"
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder='Nhập nội dung bình luận' rows={3} />
      </Form.Group>
      <button type='submit'>Thêm bình luận</button>
    </Form>
    r = <Rating initialRating={rating}
      onClick={saveRating}
      emptySymbol="fa fa-star-o fa-2x"
      fullSymbol="fa fa-star fa-2x"
    />

    l = <p onClick={addLike}>

      <i onclick="myFunction(this)" class="fa fa-thumbs-up" style={{ 'color': 'black', 'font-size': '30px' }}></i>
    </p>

    // avt =  <Image src={ user.avatar} alt="" style={{'height': '70px', 'width': '70px'}} />
  }

  return (
    <>
      <Header />
      <div style={{ 'background': '#f4f2f2' }}>
        <Container>
          <h1 className='text-success'>PostDetail</h1>
          <Row>
            <Col md={4} xs={12}>
              <Image src={post.image} style={{ width: '417px', height: '557px' }} rounded fluid />
            </Col>
            <Col md={8} xs={12}>
              <h2>{post.title}</h2>
              <p>Ngày tạo: <Moment fromNow>{post.created_date}</Moment></p>
              <p>Ngày cập nhật: <Moment fromNow>{post.updated_date}</Moment></p>


              <p>
                {r}
              </p>
              {l}

              <p>Lượt like: <h3>{likes}</h3></p>

            </Col>
          </Row>
          <hr />
          <div>
            {post.content}
          </div>
          {comments.map(c =>
            <div className="coment-area" >
              <ul className="we-comet">
                <li>
                  <div className="comet-avatar">
                    <Image src={c.creator.avatar} alt="" style={{ 'height': '70px', 'width': '70px' }} />
                  </div>
                  <div className="we-comment">
                    <div className="coment-head">
                      <h5><a title="">{c.creator.username}</a></h5>
                      <span> <Moment fromNow>{c.created_date}</Moment> </span>
                      <a className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                    </div>
                    <p>{c.content}</p>
                  </div>

                </li>

              </ul>
            </div>

          )}
          {comment}
          <br></br>
        </Container>
      </div>
      <Footer />
    </>
  )
}
