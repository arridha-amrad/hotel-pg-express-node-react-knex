import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
const Home = () => {
  document.title = "Home";
  const { loadUser, user } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return <Fragment>{user && <p>{user.username}</p>}</Fragment>;
};

export default Home;
