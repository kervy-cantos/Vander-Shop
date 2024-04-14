'use client';

import { useCartStore } from '@/lib/zustand/useCartStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AddToCart = ({ item }) => {
	const router = useRouter();

	const { increase, decrease, items } = useCartStore();

	const [existItem, setExistItem] = useState({});

	useEffect(() => {
		setExistItem(items.find(d => d.slug === item.slug));
	}, [items, item]);

	const handleAddToCart = () => {
		increase(item);
	};

	return existItem ? (
		<div>
			<button className='btn' type='button' onClick={() => decrease(existItem)}>
				-
			</button>
			<span className='px-2'>{existItem.qty}</span>
			<button className='btn' type='button' onClick={() => increase(existItem)}>
				+
			</button>
		</div>
	) : (
		<button className='btn btn-accent w-full' type='button' onClick={handleAddToCart}>
			Add to Cart
		</button>
	);
};

export default AddToCart;
