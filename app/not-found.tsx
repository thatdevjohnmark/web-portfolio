import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-screen bg-[#000000] flex items-center justify-center px-6">
			<div className="max-w-md text-center">
				<h1 className="font-pixel text-[18px] text-[#FFFFFF] mb-4 tracking-wider">[ 404 ] PAGE NOT FOUND</h1>
				<p className="font-terminal text-[22px] text-[#B0B0B0] mb-6">
					The page you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link
					href="/"
					className="inline-block font-pixel text-[11px] text-[#FFFFFF] border-[2px] border-[#FFFFFF] px-6 py-3 hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors duration-150"
				>
					[ RETURN HOME ]
				</Link>
			</div>
		</main>
	);
}

