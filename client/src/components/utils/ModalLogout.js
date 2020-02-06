import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const ModalLogout = props => {
  const { logout } = useContext(AuthContext);
  const [modal, setModal] = React.useState(false);
  return (
    <React.Fragment>
      <button className="btn-sm blue-dm" onClick={() => setModal(true)}>
        Logout
      </button>
      <div id="myModal" className={modal ? "modal block" : "modal none"}>
        <div className="modal-content">
          <div className="modal-header blue">
            <span></span>
            <h1>Header</h1>
            <span className="close" onClick={() => setModal(!modal)}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <p>Lanjutkan untuk logout?</p>
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setModal(!modal)}>
              Cancel
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                logout();
              }}
              className="btn blue"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalLogout;
