import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  URL_USERS_LOGOUT,
  URL_USERS_DETAIL,
  URL_USERS_UPDATE,
} from "../../utilis/constants";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import { useAuth } from "../../containers/authContext";
import toast, { Toaster } from "react-hot-toast";

import { connect } from "react-redux";
import {
  saveUserInStore,
  removeUserFromStore,
} from "../../containers/reduxActions";
import { KEY_LOGGED_IN_USER } from "../../containers/reduxConstants";

const ProfileComponent = ({
  userSavedInReduxStore,
  saveUserInStore,
  removeUserFromStore,
}) => {
  const { loggedInUser, clearUserFromContext } = useAuth();

  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    chatName: "",
    age: 0,
  });

  const [logoutUser, setLogoutUser] = useState(false);
  const [putData, setPutData] = useState(false);

  // actions
  const onClickChat = () => {
    console.log("on click chat");
  };

  const onSubmit = () => {
    // fields validation
    setPutData(true);
  };

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setLogoutUser(true);
    }
  };

  // use callback hooks
  const onLogoutSuccess = useCallback(() => {
    toast.success("logout successful");
    setTimeout(() => {
      clearUserFromContext();
      removeUserFromStore();
      navigate("/login");
    }, 1000);
  }, [navigate, clearUserFromContext]);

  const callLogoutAPI = useCallback(async () => {
    try {
      const options = {
        method: "POST",
        credentials: "include", // this is required to work with cookies
      };

      const response = await fetchWithGlobalErrorHandler(
        URL_USERS_LOGOUT,
        options
      );
      const body = response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      onLogoutSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  }, [onLogoutSuccess]);

  const onDetailsSuccess = useCallback(
    async (user) => {
      setFields({
        ...fields,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        chatName: user.chatName,
        age: user.age,
      });
      saveUserInStore(user);
    },
    [saveUserInStore]
  );

  const callUserDetailsAPI = useCallback(
    async (endpoint) => {
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

        onDetailsSuccess(body.data);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [onDetailsSuccess]
  );

  const onPutDataAPISuccess = useCallback(
    async (user) => {
      saveUserInStore(user);
    },
    [saveUserInStore]
  );

  const callPutDataAPI = useCallback(
    async (endpoint, payload) => {
      try {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // this is required to work with cookies
          body: JSON.stringify(payload),
        };

        const response = await fetchWithGlobalErrorHandler(endpoint, options);
        const body = await response.json();
        if (!response.ok) {
          // in case of error response body can contain handled error message from server
          throw new Error(
            body.message || response.statusText || "Something went wrong!"
          );
        }

        onPutDataAPISuccess(body.data);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [onPutDataAPISuccess]
  );

  // effect hooks
  useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
      callUserDetailsAPI(`${URL_USERS_DETAIL}/${loggedInUser.id}`);
    }
  }, []); // on load

  useEffect(() => {
    if (logoutUser) {
      setLogoutUser(false);
      callLogoutAPI();
    }
  }, [logoutUser, callLogoutAPI]);

  useEffect(() => {
    if (putData) {
      setPutData(false);
      callPutDataAPI(`${URL_USERS_UPDATE}/${loggedInUser.id}`, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        age: fields.age,
      });
    }
  }, [putData, callPutDataAPI, loggedInUser.id, fields]);

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Profile </h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          readOnly
          name="email"
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
        />
        <br />
        <label htmlFor="first name">First Name</label>
        <input
          name="first name"
          type="text"
          value={fields.firstName}
          onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
        />
        <br />
        <label htmlFor="last name">Last Name</label>
        <input
          name="last name"
          type="text"
          value={fields.lastName}
          onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
        />
        <br />
        <label htmlFor="chat name">Chat Name</label>
        <input
          readOnly
          name="chat name"
          type="text"
          value={fields.chatName}
          onChange={(e) => setFields({ ...fields, chatName: e.target.value })}
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="text"
          value={fields.age}
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
        />
        <br />
        <br />
        <div className={styles.containerButtons}>
          <button onClick={onClickChat}>Chat</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onSubmit}>Update</button>
        </div>
        <br />
        <br />
        <div className={styles.containerButtons}>
          <Link to="/reset-password">Reset Pasword</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onClickLogout}>Logout</button>
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
  return {
    saveUserInStore: (data) => dispatch(saveUserInStore(data)),
    removeUserFromStore: () => dispatch(removeUserFromStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
