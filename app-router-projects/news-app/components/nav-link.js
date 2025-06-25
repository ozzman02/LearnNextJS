'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/*
	We are using startsWith function thinking on nested paths
	<Link href="/news" className={path.startsWith('/news') ? 'active' : undefined}>News</Link>
*/
export default function NavLink({ href, children }) {

	/* find active path */
	const path = usePathname();

	return (
		<Link
			href={href}
			className={path.startsWith(href) ? 'active' : undefined}
		>
			{children}
		</Link>
	);
}