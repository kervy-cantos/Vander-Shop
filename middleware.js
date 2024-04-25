import NextAuth from 'next-auth';

const authConfig = {
	providers: [],
	callbacks: {
		authorized({ request, auth }) {
			const protectedPaths = [
				/\/shipping/,
				/\/payment/,
				/\/place-order/,
				/\/profile/,
				/\/order\/(.*)/,
				/\/admin/
			];
			const { pathname } = request.nextUrl;
			if (protectedPaths.some(p => p.test(pathname))) return !!auth;
			return true;
		}
	}
};

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
