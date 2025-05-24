import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";
import { Fragment } from "react";

export default function FilteredNewsPage({ params }) {

	/*
		The objective here is to have a path under archive with the year but showing the month in the url

			http://localhost:3000/archive/2024

				2

				images

				----------------------------------------

				Latest News

				images
	*/

	/* filter is no longer a single value it caches all path segments after archive */
	const filter = params.filter;

	/*
		[ '2024' ]
		[ '2023' ]
		[ '2021' ]
	*/
	console.log(filter);

	/*
		- params.filter comes from Next.js dynamic route parameters, meaning it contains all path segments after /archive/.
		- The ?. (optional chaining) ensures if filter is undefined or null, it won’t throw an error.
		- filter?.[0] grabs the first element in the array, which represents the selected year in the archive.

		const selectedYear = filter ? filter[0] : undefined is same as const selectedYear = filter?.[0];
	*/

	const selectedYear = filter?.[0];

	const selectedMonth = filter?.[1];

	let news;

	let links = getAvailableNewsYears();

	if (selectedYear && !selectedMonth) {
		news = getNewsForYear(selectedYear);
		links = getAvailableNewsMonths(selectedYear);
	}	

	if (selectedYear && selectedMonth) {
		news = getNewsForYearAndMonth(selectedYear, selectedMonth);
		links = [];
	}

	let newsContent = <p>No news found for the selected period.</p>

	if (news && news.length > 0) {
		newsContent = <NewsList news={news} />
	}

	/* 
		The +selectedYear syntax is using the unary plus (+) operator, which converts selectedYear into a number.
		Same thing for +selectedMonth.
	*/
	if ((selectedYear && !getAvailableNewsYears().includes(+selectedYear)) 
		|| (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))) {
		throw new Error('Invalid filter');
	}

	/* 
		This is good because we are returning a link

			{links.map((link) => (
				<li key={link}>
					<Link href={`/archive/${link}`}>{link}</Link>
				</li>
			))}
		
		But sometimes we need to write more code inside the map function. To do that, we include the {} after the => like this:

			{links.map((link) => {
				const href = selectedYear 
								? `/archive/${selectedYear}/${link}`
								: `/archive/${link}`
				return (
					<li key={link}>
						<Link href={href}>{link}</Link>
					</li>
				);
			})}

	*/

	return (
		<Fragment>
			<header id="archive-header">
				<nav>
					<ul>
						{links.map((link) => {
							const href = selectedYear 
									? `/archive/${selectedYear}/${link}`
									: `/archive/${link}`
							return (
								<li key={link}>
									<Link href={href}>{link}</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</header>
			{newsContent}
		</Fragment>
	);
}