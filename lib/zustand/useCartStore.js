import { create } from 'zustand';
import { round2 } from '../utils';

import { persist } from 'zustand/middleware';

export const useCartStore = create(
	persist(
		set => ({
			items: [],
			itemsPrice: 0,
			taxPrice: 0,
			shippingPrice: 0,
			totalPrice: 0,
			increase: item => {
				set(state => {
					const exists = state.items.find(d => d.slug === item.slug);
					const updatedCartItems = exists
						? state.items.map(d => (d.slug === item.slug ? { ...exists, qty: exists.qty + 1 } : d))
						: [...state.items, { ...item, qty: 1 }];

					const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calculatePrice(updatedCartItems);
					return { items: updatedCartItems, itemsPrice, taxPrice, shippingPrice, totalPrice };
				});
			},
			decrease: item => {
				set(state => {
					const exists = state.items.find(d => d.slug === item.slug);
					if (!exists) return;
					const updatedCartItems =
						exists.qty == 1
							? state.items.filter(d => d.slug !== item.slug)
							: state.items.map(d => (d.slug == item.slug ? { ...exists, qty: exists.qty - 1 } : d));
					const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calculatePrice(updatedCartItems);
					return { items: updatedCartItems, itemsPrice, taxPrice, shippingPrice, totalPrice };
				});
			}
		}),
		{ name: 'cart-store' }
	)
);

const calculatePrice = items => {
	const itemsPrice = round2(items.reduce((acc, item) => acc + item.price * item.qty, 0));
	const shippingPrice = round2(itemsPrice > 100 ? 0 : 100);
	const taxPrice = round2(Number(0.15 * itemsPrice));
	const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
	return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
