import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/Feed/Comments.module.scss";

import { AiFillCloseCircle } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

import { client } from "../../functions/client";
const { nanoid } = require("nanoid");

export default function Comments({ comments, idAttempt, setIsLoading, setRefresh }) {
  const [text, setText] = useState("");
  const [isAddComment, setIsAddComment] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleSend = () => {
    setIsSent(false);
    if (isLoged) {
      client
        .patch(idAttempt)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            _key: nanoid(),
            comment: text,
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
          },
        ])
        .commit()
        .then((r) => {
          setIsSent(true);
          console.log(r);
          setTimeout(()=>{
            setIsLoading(true);
            setRefresh(prev=>!prev)
          },1500)
        })
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message);
        });
    } else {
      setIsSent(true);
    }
  };

  const handleDeleteComment = (id) => {
    client
      .patch(idAttempt)
      .unset([`comments[_key=="${id}"]`])
      .commit()
      .then((r) => {
          console.log(r);
        console.log("Comment deleted");
        setIsLoading(true);
        setRefresh(prev=>!prev)
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
  }

  // get current userId
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      setIsLoged(false);
    } else {
      setIsLoged(true);
      let id = JSON.parse(localStorage.getItem("user")).googleId;
      setUserId(id);
    }
  }, []);
  

  return (
    <div className={styles.comments}>
      <h2>Comments</h2>
      <ul>
        {comments === null
          ? ""
          : comments.map((item, index) => {
              return (
                <li key={index}>
                  {userId === item.postedBy._id ? (
                    <AiFillCloseCircle
                      className={styles.deleteComment}
                      onClick={() => handleDeleteComment(item._key)}
                      />
                  ) : (
                    ""
                  )}
                  <h6>Posted By: {item.postedBy.userName}</h6>
                  <p>{item.comment}</p>
                </li>
              );
            })}
      </ul>
      <button onClick={() => setIsAddComment(true)}>Add a Comment</button>
      {isAddComment ? (
        <div className={styles.addContainer}>
          <AiFillCloseCircle
            className={styles.close}
            onClick={() => setIsAddComment(false)}
          />
          <p>Write a Comment</p>
          {!isSent ? (
            <><textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write..."
              name="comment"
              id="comment"
              rows="4"
            ></textarea><button onClick={() => handleSend()}>
              Send
              </button></>
          ) : !isLoged ? (
            <h1>Need Be Loged to sent a Comment</h1>
          ) : (
            <h1>Comment Add Succesfuly, refresh the Page!</h1>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
