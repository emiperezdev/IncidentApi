import { NextFunction, Request, Response } from "express";

const error = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error, error.message);
  res.status(500).send('SOMETHING FAILED ://');
}

export default error;