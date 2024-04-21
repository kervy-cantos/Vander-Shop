import mongoose from 'mongoose';

// Connect to MongoDB. Create a .env file in the root of the project and add the following line:
// MONGODB_URI=mongodb://localhost:27017/your-db-name or MONGODB_URI=your-mongodb-uri
export default async function dbConnect() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (error) {
		console.log(error);
	}
}
