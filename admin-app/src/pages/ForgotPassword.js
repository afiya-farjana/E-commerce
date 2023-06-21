import React from 'react';
import CustomInputs from '../components/CustomInputs';
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../features/auth/authSlice";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: '#33c5ff', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password?</h3>
        <p className="text-center">
          Please enter your register email to get reset password mail
        </p>
        <form action="">
          <CustomInputs type="text" label="email address" id="email">
            {' '}
          </CustomInputs>

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#33c5ff' }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
