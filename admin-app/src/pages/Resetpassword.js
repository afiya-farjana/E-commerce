import React from 'react';
import CustomInputs from '../components/CustomInputs';

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: '#33c5ff', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomInputs type="password" label="New Password" id="pass" />
          <CustomInputs
            type="password"
            label="Confirm Password"
            id="confirmpass"
          />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: '#33c5ff' }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
