import React from 'react';
import CustomInputs from '../components/CustomInputs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/user/userSlice';

const AddUser = () => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobile: yup.string().required('Mobile number is required'),
    password: yup.string().required('Password is required'),
    address: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createUser(values));
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add User</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInputs
            type="text"
            label="Name"
            i_id="name"
            i_class=""
            name="name"
            val={formik.values.name}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}

          <CustomInputs
            type="text"
            label="Email"
            i_id="email"
            i_class=""
            name="email"
            val={formik.values.email}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}

          <CustomInputs
            type="text"
            label="Mobile"
            i_id="mobile"
            i_class=""
            name="mobile"
            val={formik.values.mobile}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div className="error">{formik.errors.mobile}</div>
          )}

          <CustomInputs
            type="password"
            label="Password"
            i_id="password"
            i_class=""
            name="password"
            val={formik.values.password}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
