import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import CustomerTable from "./CustomerTable";
const Home = () => {
  document.title = "Home";
  const { loadUser, user } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <CustomerTable user={user} />
    </Fragment>
  );
};

export default Home;
