import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import './Home.css'

const Home = () => {
  const [blogs,setBlogs] = useState([]);
  const docRef = collection(db, "posts");


  const {currentUser} = useContext(AuthContext);
  
  useEffect(()=>{ // we'll use realtime updation using "useSnapshot"
    const getChats = ()=>{
      const q = query(collection(db, "posts"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push({...doc.data() , id: doc.id});
  });
  console.log(cities);
  setBlogs(cities)
});
       return ()=>{
        unsubscribe();
       }
    }

    currentUser.uid && getChats(); // call this function only if a user is present
   
  },[currentUser.uid]);
  console.log(blogs);
  

  const deletePost = async(id)=>{
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef)

  }
  
  return (
    <div className="homePage">
      {blogs.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                { post.userInfo.id === currentUser.uid && (
                  <button
                    onClick={() => {
                      console.log(post.id);
                      deletePost(post.id)
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.userInfo.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home