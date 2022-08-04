import cheerio from "cheerio";

export default function samsclub(html) {
	try {
		const TITLE_SELECTOR = "title:first";
		const IMAGE_SELECTOR = ".sc-image-viewer-img";
		const INVENTORY_SELECTOR = "meta[itemprop='availability']";

		const $ = cheerio.load(html);
		const title = $(TITLE_SELECTOR).text()?.trim();
		const image = $(IMAGE_SELECTOR).attr("src");
		let availability = $(INVENTORY_SELECTOR).attr("content");
		const inventory = availability === "InStock"

		return { title, image, inventory };
	} catch (error) {
		return { error };
	}
}
