import mongoose from "mongoose";

const ObjectIdCheck = (Id) => {
  return mongoose.Types.ObjectId.isValid(Id);
};

export default ObjectIdCheck
