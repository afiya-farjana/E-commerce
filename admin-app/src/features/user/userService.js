import axios from 'axios';
import { config } from "../../utils/axiosconfig";
import { base_url } from '../../utils/baseUrl';



const createUser = async (userData) => {
  try {
    const response = await axios.post(`${base_url}authUser/admin-register`, userData,config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const userService = {
  createUser,
};

export default userService;