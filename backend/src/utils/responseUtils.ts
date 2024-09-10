import { Response } from 'express';

// Define the response payload type
interface ResponsePayload {
    message: string;
    data?: any;
    error?: string;
}

// A helper function to send responses in a standardized format
export const sendResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
  const responsePayload: ResponsePayload = { message };

  // Include data only if provided and status code indicates success
  if ([200, 201, 204].includes(statusCode) && data !== null) {
    responsePayload.data = data;
  } else if (statusCode >= 400) {
    responsePayload.error = message;
  }

  // Send response with the appropriate status code and payload
  res.status(statusCode).json(responsePayload);
};
