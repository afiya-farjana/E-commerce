import React, { useEffect } from 'react';
import CustomInputs from '../components/CustomInputs';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

let schema = Yup.object().shape({
  email: Yup.string()
    .email('email should be valid')
    .required('email is required'),
  password: Yup.string().required('Password is required'),
});


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate('admin');
    } else {
      navigate('/');
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="py-5" style={{ background: '#33c5ff', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message === 'Rejected' ? 'You are not an Admin' : ''}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInputs
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange('email')}
            onBlr={formik.handleBlur('email')}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInputs
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange('password')}
            onBlr={formik.handleBlur('password')}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#33c5ff' }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
