import mongoose from "mongoose";

const runTransaction = async (callback) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await callback(session);
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export default runTransaction;