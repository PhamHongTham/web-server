import mongoose from 'mongoose';

export const connectDb = async () => {
  const url = "mongodb+srv://CaoKhaHieu:CaoKhaHieu@cluster0.r9hva.mongodb.net/Boogle?retryWrites=true&w=majority";
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to DB");
  } catch (error) {
    console.log('Error when connect to DB', error);
  }
};
