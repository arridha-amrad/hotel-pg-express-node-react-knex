import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  document.title = "Login";
  const { loginUser, error, isAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorUi, setErrorUI] = useState("");
  const [states, setState] = useState({
    email: "",
    password: ""
  });
  const { email, password } = states;

  const onChange = e => {
    setErrorUI("");
    setState({
      ...states,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    loginUser(states);
  };

  useEffect(() => {
    if (error) {
      setErrorUI(error);
    }
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint - disable - next - line;
  }, [error, props.history, isAuthenticated]);

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <h2 className="title">Login</h2>
          <h2 className="form-company">Hotel</h2>
        </div>
        <form onSubmit={onSubmit}>
          {errorUi && (
            <div className="form-notification">
              <p className="text-error">{errorUi}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              autoFocus
              name="email"
              value={email}
              onChange={onChange}
              type="email"
              placeholder="Email"
              className="input-text"
            />
          </div>
          <div className="form-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-text"
              maxLength="35"
              name="password"
              value={password}
              onChange={onChange}
            />
            <button
              className="icon"
              onClick={e => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <i className="far fa-eye fa-2x"></i>
              ) : (
                <i className="far fa-eye-slash fa-2x"></i>
              )}
            </button>
          </div>
          {email.trim() === "" || password.trim() === "" ? (
            <button className="btn-disabled gray" disabled type="submit">
              Login
            </button>
          ) : (
            <button className="btn blue" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
      <div className="form-extra-action">
        <a href="/forgot-password">
          <p>lupa password?</p>
        </a>
      </div>
    </div>
  );
};

export default Login;
