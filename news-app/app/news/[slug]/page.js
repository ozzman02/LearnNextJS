import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default function NewsDetailPage({ params }) {

	const newsSlug = params.slug;
	
	const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);

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
				<img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
				<h1>{newsItem.title}</h1>
				<time dataTime={newsItem.date}>{newsItem.date}</time>
			</header>
			<p>{newsItem.content}</p>
		</article>
	);
}