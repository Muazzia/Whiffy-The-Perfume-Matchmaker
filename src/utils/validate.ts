import { Types } from "mongoose";

export const validateObjectId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId format: ${id}`);
  }
};
