/* archive and latest are automatically passed to the layout due to the naming convention inside the archive folder */
export default function ArchiveLayout({archive, latest}) {
	return (
		<div>
			<h1>News Archive</h1>
			<section id="archive-filter">{archive}</section>
			<section id="archive-latest">{latest}</section>
		</div>
	);
}