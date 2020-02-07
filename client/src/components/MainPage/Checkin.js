import React, { useState, useContext, useEffect } from "react";
import CustomerContext from "../../context/customer/CustomerContext";
import authContext from "../../context/auth/authContext";

function Checkin() {
  const [states, setState] = useState({
    fullname: "",
    asal: "",
    durasi: "",
    noid: "",
    identitas: ""
  });

  const { checkin, message, errors, loadingCustomer } = useContext(
    CustomerContext
  );
  const { loadUser } = useContext(authContext);

  const [errorUI, setErrorUI] = useState("");

  const onChange = e => {
    setErrorUI("");
    setState({
      ...states,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    checkin(states);
    if (message) {
      setState({
        ...states,
        fullname: "",
        asal: "",
        durasi: "",
        noid: "",
        identitas: ""
      });
    }
  };

  useEffect(() => {
    if (errors) {
      setErrorUI(errors);
    }
    loadUser();
    // eslint-disable-next-line
  }, [errors]);

  return (
    <div className="container">
      <div className="form-container form-checkin">
        <div className="form-title">
          <h2 className="title">Checkin</h2>
          <h2 className="form-company">Hotel</h2>
        </div>

        {message && (
          <div className="alert-container alert-success">
            <i className="far fa-check-circle fa-2x"></i>
            <p>{message.msg}</p>
          </div>
        )}

        <form onSubmit={onSubmit} autoComplete="off">
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Fullname"
              className="input-text"
              onChange={onChange}
              name="fullname"
              value={states.fullname}
            />
          </div>
          {errorUI.fullname && (
            <div className="text-error">
              <p>{errorUI.fullname}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Jenis identitas"
              className="input-text"
              onChange={onChange}
              name="identitas"
              value={states.identitas}
            />
          </div>
          {errorUI.identitas && (
            <div className="text-error">
              <p>{errorUI.identitas}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Id Number"
              className="input-text"
              onChange={onChange}
              name="noid"
              value={states.noid}
            />
          </div>
          {errorUI && (
            <div className="text-error">
              <p>{errorUI.noid}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Asal"
              className="input-text"
              onChange={onChange}
              name="asal"
              value={states.asal}
            />
          </div>
          {errorUI && (
            <div className="text-error">
              <p>{errorUI.asal}</p>
            </div>
          )}
          <div className="form-wrapper">
            <input
              type="number"
              placeholder="Durasi Menginap dalam hari"
              className="input-text"
              onChange={onChange}
              name="durasi"
              value={states.durasi}
            />
          </div>
          {errorUI && (
            <div className="text-error">
              <p>{errorUI.durasi}</p>
            </div>
          )}
          {loadingCustomer ? (
            <button className="btn loading blue" disabled>
              <i className="fa fa-spinner fa-spin"></i>&nbsp;Loading
            </button>
          ) : (
            <button type="submit" className="btn blue">
              Check In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Checkin;
