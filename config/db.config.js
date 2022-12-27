import mongoose from 'mongoose';

export const connectDb = async () => {
  const url = process.env.DB_URL;
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
