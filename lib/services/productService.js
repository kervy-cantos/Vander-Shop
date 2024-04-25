import { cache } from 'react';
import dbConnect from '../dbConnect';
import ProductModel from '../models/ProductModel';

export const revalidateTime = 3600;

const getLatest = cache(async () => {
	await dbConnect();
	const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean();
	return products;
});

const getFeatured = cache(async () => {
	await dbConnect();
	const products = await ProductModel.find({ isFeatured: true });
	return products;
});

const getBySlug = cache(async slug => {
	await dbConnect();
	const product = await ProductModel.findOne({ slug }).lean();
	const modifiedParam = { ...product, _id: product._id.toString() };
	return modifiedParam;
});
const productService = {
	getLatest,
	getFeatured,
	getBySlug
};

export default productService;
