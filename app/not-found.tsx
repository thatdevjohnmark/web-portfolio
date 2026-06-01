import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-screen flex items-center justify-center px-6">
			<div className="max-w-md text-center">
				<h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
				<p className="text-gray-600 mt-3">
					The page you’re looking for doesn’t exist.
				</p>
				<Link
					href="/"
					className="inline-block mt-6 text-blue-600 hover:underline"
				>
					Go back home
				</Link>
			</div>
		</main>
	);
}

