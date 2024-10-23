import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth'; 

export const registerUser = async (userData: { name: string, email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};



export const loginUser = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem('token', response.data.data.accessToken);
  localStorage.setItem('userId', response.data.data.userId);
  return response.data.data.accessToken;
};
