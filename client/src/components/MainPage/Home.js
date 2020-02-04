import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
function Home() {
  document.title = "Home";
  const { user, loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <h1>{user ? <p>{user.email}</p> : <p>loading...</p>}</h1>
      )}
    </div>
  );
}

export default Home;
