/* eslint-disable @next/next/no-img-element */
import ProductItem from '@/components/products/ProductItem';
import Image from 'next/image';
import data from '@/lib/data';
import productService from '@/lib/services/productService';
import Link from 'next/link';

//Set the metadata for the page. You can add the title and description of the page in your local env.
export const metadata = {
	title: process.env.NEXT_PUBLIC_SITE_NAME || 'Vander Shop',
	description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'eCommerce site'
};

export default async function Home() {
	const featuredProducts = await productService.getFeatured();
	const latestProducts = await productService.getLatest();

	return (
		<>
			<div className='w-full carousel rounded-box mt-4'>
				{featuredProducts.map((product, index) => (
					<div key={product._id} id={`#slide-${index}`} className='carousel-item relative w-full'>
						<Link href={`/product/${product.slug}`}>
							<img src={product.banner} alt={product.name} className='w-full' />
						</Link>
						<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
							<a
								href={`#slide-${index === 0 ? featuredProducts.length - 1 : index - 1}`}
								className='btn btn-circle'>
								&#10094;
							</a>
							<a
								href={`#slide-${index === featuredProducts.length - 1 ? 0 : index + 1}`}
								className='btn btn-circle'>
								&#10095;
							</a>
						</div>
					</div>
				))}
			</div>

			<h2 className='text-2xl py-2'>Latest Products</h2>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{latestProducts.map(product => (
					<ProductItem key={product.slug} product={product} />
				))}
			</div>
		</>
	);
}
