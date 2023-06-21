import { React, useEffect } from 'react';
import CustomInputs from '../components/CustomInputs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required('Brand Name is Required'),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split('/')[3];
  console.log(getBrandId);
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfullly!');
    }
    if (isSuccess && updatedBrand) {
      toast.success('Brand Updated Successfullly!');
      navigate('/admin/list-brand');
    }

    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("anny");
      if (getBrandId !== undefined) {
        console.log("anny2");
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        console.log("anny3");
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInputs
            type="text"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
            label="Enter Brand"
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
