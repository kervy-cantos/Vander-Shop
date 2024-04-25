'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

const Form = () => {
	const { data: session } = useSession();

	const params = useSearchParams();
	let callbackUrl = params.get('callbackUrl') || '/';
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	useEffect(() => {
		if (session && session.user) {
			router.push(callbackUrl);
		}
	}, [callbackUrl, params, router, session]);

	const formSubmit = async form => {
		const { email, password } = form;
		signIn('credentials', {
			email,
			password
		});
	};

	return (
		<div className='max-w-sm mx-auto card bg-base-300 my-4'>
			<div className='card-body'>
				<h1 className='card-title'>Sign In</h1>
				{params.get('error') && (
					<div className='alert text-error'>
						{params.get('error') === 'CredentialsSignin'
							? 'Invalid email or password'
							: params.get('error')}
					</div>
				)}
				{params.get('success') && <div className='alert text-success'>{params.get('success')}</div>}
				<form onSubmit={handleSubmit(formSubmit)}>
					<div className='my-2'>
						<label className='label' htmlFor='email'>
							Email
						</label>
						<input
							type='text'
							id='email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
									message: 'Invalid email'
								}
							})}
							className='input input-bordered w-full max-w-sm'
						/>
						{errors.email?.message && <div className='text-error'>{errors.email.message}</div>}
					</div>
					<div className='my-2'>
						<label className='label' htmlFor='password'>
							Password
						</label>
						<input
							type='password'
							id='password'
							{...register('password', {
								required: 'Password is required'
							})}
							className='input input-bordered w-full max-w-sm'
						/>
						{errors.password?.message && <div className='text-error'>{errors.password.message}</div>}
					</div>
					<div className='my-4'>
						<button type='submit' disabled={isSubmitting} className='btn btn-accent w-full'>
							{isSubmitting && <span className='loading loading-spinner'></span>}
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Form;
