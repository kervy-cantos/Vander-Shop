import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from './dbConnect';
import UserModel from './models/UserModel';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';

export const config = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				await dbConnect();
				if (credentials === null) {
					return null;
				}
				const user = await UserModel.findOne({ email: credentials.email });
				if (user) {
					const isValid = await bcrypt.compare(String(credentials.password), user.password);
					if (isValid) {
						return user;
					}
				}
				return null;
			}
		})
	],
	pages: {
		signIn: '/signin',
		newUser: '/signup',
		error: '/signin'
	},
	callbacks: {
		authorized({ request, auth }) {
			const protectedPaths = [/\/checkout/, /\/payment/, /\/place-order/, /\/order\/(.*)/, /\/admin/];
			const pathName = request.nextUrl;
			if (protectedPaths.some(d => d.test(pathName))) return !!auth;
			return true;
		},
		async jwt({ user, trigger, session, token }) {
			if (user) {
				token.user = {
					_id: user._id,
					email: user.email,
					name: user.name,
					isAdmin: user.isAdmin
				};
			}
			if (trigger === 'update' && session) {
				token.user = {
					...token.user,
					email: session.user.email,
					name: session.user.name
				};
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user = token.user;
			}
			return session;
		}
	}
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth(config);
