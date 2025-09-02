import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: unknown,
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendPaginationSuccess = (
  res: Response,
  data: any,
  message = "Success",
  statusCode = 200
) => {
  const { docs, ...rest } = data;
  return res.status(statusCode).json({
    success: true,
    message,
    data: docs,
    pagination: { ...rest },
  });
};

export const sendError = (
  res: Response,
  error: unknown,
  message = "Something went wrong",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV === "production"
        ? undefined
        : error instanceof Error
        ? error.message
        : error,
  });
};
