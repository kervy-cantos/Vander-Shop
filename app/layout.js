import { Inter } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import Header from '@/components/header/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Vander Shop',
	description: 'ECommerce Website'
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='min-h-screen flex flex-col'>
					<Header />
					{children}

					<footer className='footer footer-center mt-3 p-4 bg-base-300 text-base-content'>
						<p>Copyright @ 2024 - Vander Shop</p>
					</footer>
				</div>
			</body>
		</html>
	);
}
