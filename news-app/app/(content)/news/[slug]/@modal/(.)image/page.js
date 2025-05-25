import { notFound } from "next/navigation";
import { Fragment } from "react";
import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {

	const newsItemSlug = params.slug;

	//const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);

	const newsItem = await getNewsItem(newsItemSlug);

	if (!newsItem) {
		notFound();
	}
	
	return (
		<Fragment>
			<ModalBackdrop />
			<dialog className="modal" open>
				<div className="fullscreen-image">
					<img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
				</div>
			</dialog>
		</Fragment>
	);
}