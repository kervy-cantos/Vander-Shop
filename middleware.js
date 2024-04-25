export { auth as middleware } from './lib/auth.js';

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/image (Image Optimization routes)
		 * - favicon.ico (Favicon)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
