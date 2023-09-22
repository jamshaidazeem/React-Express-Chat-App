import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Chat.module.css";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import { URL_USERS_NEW_PASS } from "../../utilis/constants";
import toast, { Toaster } from "react-hot-toast";

const ChatComponent = () => {
  const [getData, setGetData] = useState(false);
  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    senderId: "",
    message: "",
    recieverId: "",
  });

  // actions
  const onSubmit = () => {
    if (!fields.senderId || !fields.recieverId) {
      toast.error("sender or reciever id is missing!");
    } else if (!fields.message) {
      toast.error("message should not be empty!");
    } else {
      setPostData(true);
    }
  };

  // use callback hooks
  const callPostDataAPI = useCallback(async (payload) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const response = await fetchWithGlobalErrorHandler(
        URL_USERS_NEW_PASS,
        options
      );
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      toast.success("message send successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  // use effect hooks
  useEffect(() => {
    if (postData) {
      setPostData(false);
      callPostDataAPI({ ...fields });
    }
  }, [postData, fields, callPostDataAPI]);

  return (
    <>
      <div className={`${styles.container}`}>
        {/* chat users */}
        <div className={`${styles.containerUsersList}`}>
          <div className={`${styles.header}`}>Chat Users</div>
          <div className={`${styles.containerList}`}>Chat Users List</div>
        </div>
        {/* chat messages */}
        <div className={`${styles.containerChat}`}>
          <div className={`${styles.header}`}>Messages</div>
          <div className={`${styles.containerList}`}>Messages List</div>
          <div className={`${styles.footer}`}>
            <textarea
              name="chatbox"
              className={styles.containerMessage}
              placeholder="Type and send a message"
              onChange={(e) =>
                setFields({ ...fields, message: e.target.value })
              }
            />
            <div className={styles.containerButtons}>
              <button className={styles.buttonMessage} onClick={onSubmit}>
                Send
              </button>
              <br />
              <br />
              <Link to="/profile">Back To Profile</Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ChatComponent;
