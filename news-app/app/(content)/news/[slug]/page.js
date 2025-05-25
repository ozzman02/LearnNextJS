import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

export default async function NewsDetailPage({ params }) {

	const newsSlug = params.slug;
	
	//const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);

	const newsItem = await getNewsItem(newsSlug);

	/* 
		We have a not-found.js file to handle cases where newsItem is undefined but the system does not really understands when does that happen.
		We then need to call the notFound function with a conditional to capture the not found scenario.
	*/
	if (!newsItem) {
		notFound();
	}

	return (
		<article className="news-article">
			<header>
				{/* /news/${newsItem.slug}/image is the path of the page that is news/[slug]/image/page */}
				<Link href={`/news/${newsItem.slug}/image`}>
					<img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
				</Link>
				<h1>{newsItem.title}</h1>
				<time dataTime={newsItem.date}>{newsItem.date}</time>
			</header>
			<p>{newsItem.content}</p>
		</article>
	);
}