import React, { useState, useEffect, useContext } from "react";
import './CreatePost.css'
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

 
const createPost = async()=>{
  console.log(title , postText);
  const postsRef = collection(db, "posts");
  console.log(postsRef);
  await addDoc(postsRef, { title: title, postText:postText , userInfo:{name: currentUser.displayName , id: currentUser.uid}});
  
  navigate('/')


}
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;