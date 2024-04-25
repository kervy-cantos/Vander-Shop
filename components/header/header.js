'use client';

import { useCartStore } from '@/lib/zustand/useCartStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
	const { items } = useCartStore();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const signOutHandler = () => {
		signOut({ callbackUrl: '/signin' });
	};

	const { data: session } = useSession();

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
								<FontAwesomeIcon icon={faCartShopping} />
								Cart{' '}
								{items.length > 0 && (
									<div className='badge badge-warning'>{items.reduce((a, c) => a + c.qty, 0)}</div>
								)}
							</Link>
						</li>

						{session && session.user ? (
							<>
								<li>
									<div className='dropdown dropdown-bottom dropdown-end'>
										<label tabIndex={0} className='btn btn-ghost rounded-btn'>
											{session.user.name}
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												strokeWidth={1.5}
												className='w-6 h-6'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</label>
										<ul
											tabIndex={0}
											className='menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52'>
											<li>
												<button type='button' onClick={signOutHandler}>
													Sign Out
												</button>
											</li>
										</ul>
									</div>
								</li>
							</>
						) : (
							<li>
								<button className='btn btn-accent' type='button' onClick={() => signIn()}>
									<FontAwesomeIcon icon={faUserTie} />
									Sign In
								</button>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
