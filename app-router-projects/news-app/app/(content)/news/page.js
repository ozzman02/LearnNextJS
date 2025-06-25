import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
import { Fragment } from "react";


export default async function NewsPage() {

	const news = await getAllNews();

	return (
		<Fragment>
			<h1>News Page</h1>
			<NewsList news={news} />
		</Fragment>
	);
}