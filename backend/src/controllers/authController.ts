import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/authService';
import { sendResponse } from '../utils/responseUtils';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUserService(name, email, password);
    sendResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    console.error('Error registering user:', error);
    sendResponse(res, 500, 'Internal server error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    if (result) {
      sendResponse(res, 200, 'Login successful', result);
    } else {
      sendResponse(res, 401, 'Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    sendResponse(res, 500, 'Internal server error');
  }
};
