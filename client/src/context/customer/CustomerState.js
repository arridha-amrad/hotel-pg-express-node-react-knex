import React, { useReducer } from "react";
import CustomerContext from "./CustomerContext";
import CustomerReducer from "./CustomerReducer";
import Axios from "axios";
import {
  CUSTOMER_LOADED,
  CUSTOMER_LOADED_FAIL,
  CHECKIN_FAIL,
  CHECKIN_SUCCESS,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL
} from "../types";

const CustomerState = props => {
  const initialState = {
    customer: null,
    message: null,
    errors: null,
    loadingCustomer: false
  };
  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  // load Customer
  const loadCustomer = async () => {
    initialState.loadingCustomer = true;
    try {
      const res = await Axios.get("/api/customers");
      dispatch({
        type: CUSTOMER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CUSTOMER_LOADED_FAIL,
        payload: err.response.data
      });
    }
  };
  const checkin = async data => {
    // config to supply axios post
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    initialState.loadingCustomer = true;

    try {
      const res = await Axios.post("/api/customers", data, config);
      dispatch({
        type: CHECKIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CHECKIN_FAIL,
        payload: err.response.data
      });
    }
  };
  const checkout = async customer => {
    // cid -> customer.id
    initialState.loadingCustomer = true;
    // config to supply axios post
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await Axios.put(
        `/api/customers/${customer.id}`,
        customer,
        config
      );
      dispatch({
        type: CHECKOUT_SUCCESS,
        payload: res.data
      });
      loadCustomer();
    } catch (err) {
      dispatch({
        type: CHECKOUT_FAIL
      });
    }
  };
  return (
    <CustomerContext.Provider
      value={{
        customer: state.customer,
        message: state.message,
        errors: state.errors,
        loadingCustomer: state.loadingCustomer,
        loadCustomer,
        checkin,
        checkout
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
