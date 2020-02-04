import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Registrasi = () => {
  document.title = "Registrasi";
  const authContext = useContext(AuthContext);
  const { register, message, error } = authContext;
  const [showPassword, setShowPassword] = useState(false);
  const [errorUi, setErrorUI] = useState("");
  const [states, setState] = useState({
    email: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    setErrorUI(error);
  }, [error]);

  const { email, username, password } = states;

  const onChange = e => {
    setErrorUI("");
    setState({
      ...states,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await register(states);
    setState({
      ...states,
      email: "",
      username: "",
      password: ""
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <h2 className="title">Registrasi</h2>
          <h2 className="form-company">Hotel</h2>
        </div>
        <form onSubmit={onSubmit}>
          {message && (
            <div className="form-notification">
              <p className="text-success">{message}</p>
            </div>
          )}
          {errorUi && (
            <div className="form-notification">
              <p className="text-error">{errorUi}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              autoFocus
              name="username"
              type="text"
              placeholder="Nama"
              className="input-text"
              value={username}
              onChange={onChange}
            />
          </div>
          <div className="form-wrapper">
            <input
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
              name="password"
              onChange={onChange}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-text"
              maxLength="35"
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
          {email.trim() === "" ||
          username.trim() === "" ||
          password.trim() === "" ? (
            <button className="btn-disabled gray" disabled type="submit">
              Register
            </button>
          ) : (
            <button className="btn blue" type="submit">
              Register
            </button>
          )}
        </form>
      </div>
      <div className="form-extra-action">
        <span>
          Already have accout ? <a href="/">login</a>
        </span>
      </div>
    </div>
  );
};

export default Registrasi;
