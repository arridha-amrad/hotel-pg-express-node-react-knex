import React, { useContext } from "react";
import CustomerContext from "../../context/customer/CustomerContext";

const ModalCheckout = ({ customer }) => {
  const { checkout } = useContext(CustomerContext);
  const [modal, setModal] = React.useState(false);
  return (
    <React.Fragment>
      <button className="btn-checkout" onClick={() => setModal(true)}>
        Process Checkout
      </button>
      <div id="myModal" className={modal ? "modal block" : "modal none"}>
        <div className="modal-content">
          <div className="modal-header blue">
            <span></span>
            <h1>Checkout</h1>
            <span className="close" onClick={() => setModal(!modal)}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <p>Lanjutkan checkout?</p>
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setModal(!modal)}>
              Cancel
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                checkout(customer);
              }}
              className="btn blue"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalCheckout;
