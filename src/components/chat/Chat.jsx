import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Chat.module.css";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import {
  URL_USERS_LIST,
  URL_MESSAGES_CREATE,
  URL_MESSAGES,
} from "../../utilis/constants";
import toast, { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { KEY_LOGGED_IN_USER } from "../../containers/reduxConstants";

const ChatComponent = ({ userSavedInReduxStore }) => {
  const [getChatUsers, setGetChatUsers] = useState(false);
  const [chatUsers, setChatUsers] = useState([]);
  const [chatUserSelectedForChat, setChatUserSelectedForChat] = useState(null);

  const [fields, setFields] = useState({
    senderId: "",
    message: "",
    recieverId: "",
  });
  const [postMessage, setPostMessage] = useState(false);

  const [getMessages, setGetMessages] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  // actions
  const onSubmit = () => {
    if (chatUserSelectedForChat) {
      setFields({
        ...fields,
        senderId: userSavedInReduxStore._id,
        recieverId: chatUserSelectedForChat._id,
      });

      setPostMessage(true);
    } else {
      toast.error("please select a user to send a message!");
    }
  };

  const onChatUserClicked = (user) => {
    setFields((prevFields) => ({ ...prevFields, recieverId: user._id }));
    setChatUserSelectedForChat(user);
    setGetMessages(true);
  };

  // helpers
  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // use callback hooks
  const callPostDataAPI = useCallback(async (payload) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is required to work with cookies
      body: JSON.stringify(payload),
    };
    try {
      const response = await fetchWithGlobalErrorHandler(
        URL_MESSAGES_CREATE,
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

      setGetMessages(true);
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

  const callGetChatMessagesAPI = useCallback(async (filters) => {
    try {
      const options = {
        method: "GET",
        credentials: "include", // this is required to work with cookies
      };

      const params = new URLSearchParams();
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          params.append(key, filters[key]);
        }
      }

      const url = `${URL_MESSAGES}?${params.toString()}`;

      const response = await fetchWithGlobalErrorHandler(url, options);
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      setChatMessages(body.data && body.data.length ? body.data : []);
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
    if (postMessage) {
      setPostMessage(false);
      if (!fields.senderId || !fields.recieverId) {
        toast.error("sender or reciever id is missing!");
      } else if (!fields.message) {
        toast.error("message should not be empty!");
      } else {
        callPostDataAPI(fields);
      }
    }
  }, [postMessage, fields, callPostDataAPI]);

  useEffect(() => {
    if (getMessages) {
      setGetMessages(false);
      const filters = {
        senderId: userSavedInReduxStore._id,
        recieverId: chatUserSelectedForChat._id,
      };
      callGetChatMessagesAPI(filters);
    }
  }, [
    getMessages,
    callGetChatMessagesAPI,
    userSavedInReduxStore,
    chatUserSelectedForChat,
  ]);

  // JSX
  const getChatUserJSX = (user) => {
    return (
      <div
        key={user._id}
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

  const getChatMessageJSX = (message) => {
    const isSenderTheLoggedInUser =
      message.senderId === userSavedInReduxStore._id;
    const formattedDate = getFormattedDate(message.createdAt);

    return (
      <div
        key={message._id}
        className={
          isSenderTheLoggedInUser
            ? styles.containerMessageCell
            : styles.containerMessageCell2
        }
      >
        <div className={styles.containerMessage}>
          <h3>
            {`${message.senderId.toUpperCase()}`} messaged at{" "}
            {`${formattedDate}`}
          </h3>
          <br />
          <h2>message: {`${message.message}`}</h2>
        </div>
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
          <div className={styles.containerList}>
            {chatMessages &&
              chatMessages.length &&
              chatMessages.map((message) => getChatMessageJSX(message))}
          </div>
          <div className={styles.footer}>
            <textarea
              name="chatbox"
              className={styles.containerChatBox}
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
