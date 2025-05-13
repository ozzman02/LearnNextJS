import NewsList from "@/components/news-list";
import { DUMMY_NEWS } from "@/dummy-news";
import { Fragment } from "react";


export default function NewsPage() {
	return (
		<Fragment>
			<h1>News Page</h1>
			<NewsList news={DUMMY_NEWS} />
		</Fragment>
	);
}