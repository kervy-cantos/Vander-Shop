'use client';

import { useCartStore } from '@/lib/zustand/useCartStore';
import Link from 'next/link';
import React from 'react';

const Header = () => {
	const { items } = useCartStore();
	return (
		<header>
			<nav>
				<div className='navbar justify-between bg-base-300'>
					<Link href='/' className='btn btn-ghost text-lg'>
						Vander Shop
					</Link>
					<ul className='flex gap-1'>
						<li>
							<Link className='btn btn-accent rounded-btn' href='/cart'>
								Cart{' '}
								{items.length > 0 && (
									<div className='badge badge-warning'>{items.reduce((a, c) => a + c.qty, 0)}</div>
								)}
							</Link>
						</li>

						<li>
							<Link className='btn btn-accent rounded-btn' href='/signin'>
								Sign In
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
