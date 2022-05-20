import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Apis, { endpoints } from '../configs/Apis'
import cookies from 'react-cookies';
import Moment from 'react-moment';




export default function Post(props) {
    let path = `/postdetail/${props.obj.post_id}/`
    let path2 = `/homedetail/${props.obj.user.username}/`

    // let pathhas = `/hashtag/${props.obj.t}/`
    let tt = props.obj.title;
    const myArray = tt.split(" ");
    let myHashTag = []
    for (let x in myArray) {
        if (myArray[x][0] == '#') {
            myHashTag.push(myArray[x])
        }
        
    }
    for (let x in myHashTag) {
        myHashTag[x] = myHashTag[x].slice(1, myHashTag[x].length)
    }

    console.log('HASHTAG', myHashTag)
    // let pathhas = `/hashtag/${props.obj.t}/`
    
    var pathhas = []
    for (let ht in myHashTag) {
        let x = myHashTag[ht]
        pathhas.push({
            ht: '#'+x,
            link: `/hashtag/${x}`
        }
        )
    }

    console.log('AFTER', pathhas)
  return (
    <>
      
        <div className="loadMore">
            <div className="central-meta item">
                
                <div className="user-post">
                    <div className="friend-info">
                        <figure>
                        <Link className='img-user' to={path2}>
                            <img src={props.obj.user.avatar} alt="" style={{'height': '60px', 'width': '60px'}} />
                        </Link>
                        </figure>
                        <div className="friend-name">
                            <ins><a title="">{props.obj.user.first_name} {props.obj.user.last_name}</a></ins>
                            <span>published: <Moment fromNow>{props.obj.created_date}</Moment></span>
                            
                        </div>
                        <div className="post-meta">
                        
                                {pathhas.map( t => 
                                    <h3>
                                    <Link className='img-user' to={t.link}>
                                        <a style={{color:'blue'}} >{t.ht}</a>
                                    </Link> </h3>
                                )}
                            <h3>{props.obj.title}</h3>
                            
                        
                            <Link to={path}>
                                <img src={props.obj.image} alt="avatar" style={{width:'700px', height: '800px'}} />
                            </Link>
                            
                            <div className="description">

                                <p>
                                    {props.obj.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
              
         
     
    </>
  )
}
