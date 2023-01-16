import { Actor } from "apify";
import { CheerioCrawler } from "crawlee";
import { router } from "./routes.js";

await Actor.init();

const crawler = new CheerioCrawler({
    requestHandler: router,
});

await crawler.run(["https://news.ycombinator.com/"]);

await Actor.exit();
