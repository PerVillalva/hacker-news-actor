import { Dataset, createCheerioRouter } from "crawlee";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, $ }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        globs: ["https://news.ycombinator.com/?p=*"],
    });

    const data = $(".athing")
        .map((index, post) => {
            return {
                postUrL: $(post).find(".title a").attr("href"),
                title: $(post).find(".title a").text(),
                rank: $(post).find(".rank").text(),
                author: $(post).find("+tr .hnuser").text(),
                points: $(post)
                    .find("+tr .score")
                    .text()
                    .replace(" points", ""),
            };
        })
        .toArray();

    await Dataset.pushData({
        data,
    });
});
