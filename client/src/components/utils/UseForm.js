import { useState } from "react";

export const useForm = (initialError = "", initialState = {}) => {
  const [states, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialError);

  const xErrors = err => {
    setErrors(err);
  };

  const onChange = e => {
    setErrors("");
    setState({
      ...states,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    // callback(states);
    console.log(states);
    setState(initialState);
  };

  return {
    onChange,
    onSubmit,
    states,
    errors,
    xErrors
  };
};
