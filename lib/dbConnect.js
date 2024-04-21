import mongoose from 'mongoose';

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
