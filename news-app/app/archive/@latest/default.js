import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";
import { Fragment } from "react";

/* 
	Default fallback content. We need this page because the latest parallel route does not not supporting [year].
	Parallel routs must have the same pattern because you want to render them in the same page.
	
	If the default fallback content page is equivalent to the page.js then we can delete it. 
	In this case we are deleting the previous page.js file under @latest folder.
*/
export default function LatestNewsPage() {

	const latestNews = getLatestNews();

	return (
		<Fragment>
			<h2>Latest News</h2>
			<NewsList news={latestNews} />
		</Fragment>
		
	);
}