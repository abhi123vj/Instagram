import React, { useState ,useEffect } from 'react';
import './Post.css';
import {db} from './firebase';
import firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
function Post({postId,user, username,caption,imgurl}) {
     const [comments , setComments] = useState([]);
     const [comment  , setComment] = useState('');

     useEffect(() => {
         let unsubscribe;
         if(postId){
             unsubscribe = db
             .collection('posts')
             .doc(postId)
             .collection('comments')
             .orderBy('timestamp', 'desc')
             .onSnapshot((snapshot) => {
                 setComments(snapshot.docs.map((doc)=> doc.data()));
             });
         }
         return () => {
             unsubscribe();
         };
     }, [postId]);

     const postComment = (event) =>{
         event.preventDefault();

         db.collection("posts").doc(postId).collection("comments").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text : comment,
             username : user.displayName
            
         });

         setComment('');

     }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3></div>

            <img className="post__image" src={imgurl} alt="" />
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__commets">
                {
                    comments.map((comment)=>(
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }

            </div>
            {user && (<form className="post__commentbox">
                <input
                className="post__input"
                type ="text"
                placeholder="Add a comment..."
                value = {comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
                >
                    post
                </button>
            </form>)}
            
        </div>
    )
}

export default Post
