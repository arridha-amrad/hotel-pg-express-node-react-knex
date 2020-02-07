import {
  CUSTOMER_LOADED,
  CUSTOMER_LOADED_FAIL,
  CHECKIN_SUCCESS,
  CHECKIN_FAIL,
  CHECKOUT_FAIL,
  CHECKOUT_SUCCESS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CUSTOMER_LOADED:
      return {
        ...state,
        customer: action.payload,
        loadingCustomer: false
      };
    case CUSTOMER_LOADED_FAIL:
      return {
        ...state,
        customer: null,
        loadingCustomer: false,
        errors: action.payload
      };
    case CHECKIN_SUCCESS:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loadingCustomer: false
      };
    case CHECKOUT_FAIL:
    case CHECKIN_FAIL:
      return {
        ...state,
        errors: action.payload,
        loadingCustomer: false
      };
    default:
      return state;
  }
};
