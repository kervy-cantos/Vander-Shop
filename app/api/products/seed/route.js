import data from '@/lib/data';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

//Use the GET method to seed the database with the data from the data.js file
export const GET = async req => {
	const { users, products } = data;

	await dbConnect();
	await UserModel.deleteMany();
	await UserModel.insertMany(users);

	await ProductModel.deleteMany();
	await ProductModel.insertMany(products);

	return NextResponse.json({ message: 'Seeded successfully', users, products });
};
