import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Chat.module.css";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import { URL_USERS_LIST } from "../../utilis/constants";
import toast, { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { KEY_LOGGED_IN_USER } from "../../containers/reduxConstants";

const ChatComponent = ({ userSavedInReduxStore }) => {
  const [getChatUsers, setGetChatUsers] = useState(false);
  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    senderId: "",
    message: "",
    recieverId: "",
  });
  const [chatUsers, setChatUsers] = useState([]);
  const [chatUserSelectedForChat, setChatUserSelectedForChat] = useState(null);
  const [getMessages, setGetMessages] = useState(false);

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

  const onChatUserClicked = (user) => {
    console.log("🚀 ~ file: Chat.jsx:34 ~ onChatUserClicked ~ user:", user);
    setChatUserSelectedForChat(user);
    setGetMessages(true);
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
        URL_USERS_LIST,
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

  const callGetChatUsersAPI = useCallback(async (endpoint) => {
    try {
      const options = {
        method: "GET",
        credentials: "include", // this is required to work with cookies
      };

      const response = await fetchWithGlobalErrorHandler(endpoint, options);
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      setChatUsers(body.data && body.data.length ? body.data : []);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  // use effect hooks
  useEffect(() => {
    setFields({ ...fields, senderId: userSavedInReduxStore._id });
    setGetChatUsers(true);
  }, []); // on load

  useEffect(() => {
    if (getChatUsers) {
      setGetChatUsers(false);
      callGetChatUsersAPI(`${URL_USERS_LIST}/${userSavedInReduxStore._id}`);
    }
  }, [getChatUsers, callGetChatUsersAPI, userSavedInReduxStore]);

  useEffect(() => {
    if (postData) {
      setPostData(false);
      callPostDataAPI({ ...fields });
    }
  }, [postData, fields, callPostDataAPI]);

  // JSX
  const getChatUserJSX = (user) => {
    return (
      <div
        className={styles.containerUser}
        onClick={() => {
          onChatUserClicked(user);
        }}
      >
        <h3>Chat Name: {`${user.chatName.toUpperCase()}`}</h3>
        <h3>Name: {`${user.firstName} ${user.lastName}`}</h3>
        <h3>Age: {`${user.age}`}</h3>
        <h3>Email: {`${user.email}`}</h3>
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        {/* chat users */}
        <div className={styles.containerUsersList}>
          <div className={styles.header}>
            <h2>Chat Users</h2>
          </div>
          <div className={styles.containerList}>
            {chatUsers &&
              chatUsers.length &&
              chatUsers.map((user) => getChatUserJSX(user))}
          </div>
        </div>
        {/* chat messages */}
        <div className={styles.containerChat}>
          <div className={styles.header}>
            <h2>Messages</h2>
          </div>
          <div className={styles.containerList}>Messages List</div>
          <div className={styles.footer}>
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

const mapStateToProps = (state) => ({
  userSavedInReduxStore: state[KEY_LOGGED_IN_USER],
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
