'use client';
import { useCartStore } from '@/lib/zustand/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const CartDetails = () => {
	const router = useRouter();
	const { items, itemsPrice, decrease, increase } = useCartStore();
	console.log(itemsPrice);

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<h1 className='py-4 text-2xl'>Your Cart</h1>

			{items.length === 0 ? (
				<div>
					Cart is empty. <Link href='/'>Go back shopping</Link>
				</div>
			) : (
				<div className='grid md:grid-cols-4 md:gap-5'>
					<div className='overflow-x-auto md:col-span-3'>
						<table className='table'>
							<thead>
								<tr>
									<th>Product</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{items.map(item => (
									<tr key={item.slug}>
										<td>
											<Link href={`/product/${item.slug}`}>
												<Image src={item.image} alt={item.name} width={50} height={50} />
												<span className='px-2'>{item.name}</span>
											</Link>
										</td>
										<td>
											<button className='btn' type='button' onClick={() => decrease(item)}>
												-
											</button>
											<span className='px-2'>{item.qty}</span>
											<button className='btn' type='button' onClick={() => increase(item)}>
												+
											</button>
										</td>
										<td>₱{item.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div>
						<div className='card bg-base-300'>
							<div className='card-body'>
								<ul>
									<li>
										<div className='pb-3 text-xl'>
											Subtotal ({items.reduce((a, c) => a + c.qty, 0)} items) :
										</div>
										<span className='text-xl'> ₱ {itemsPrice}</span>
									</li>
									<li>
										<button
											className='btn btn-accent w-full mt-3'
											type='button'
											onClick={() => router.push('/checkout')}>
											Proceed to Checkout
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CartDetails;
