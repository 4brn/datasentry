import type { Data } from "@/../../events";
import { DEFAULT_TIMER, FAST_TIMER, scrapers } from "@/scraper/scraper";
import { isAuth } from "./auth";

const getScraper = (data: Data) => scrapers[data] || false;

const startScraper = async (passwordHash: string, data: Data) => {
	if (!isAuth(passwordHash)) return;

	const scraper = getScraper(data);
	if (!scraper) return;

	scraper.start();
};

const stopScraper = async (passwordHash: string, data: Data) => {
	if (!isAuth(passwordHash)) return;

	const scraper = getScraper(data);
	if (!scraper) return;

	scraper.stop();
};

const terminateScraper = async (passwordHash: string, data: Data) => {
	if (!isAuth(passwordHash)) return;

	const scraper = getScraper(data);
	if (!scraper) return;

	scraper.terminate();
};

const changeIntervalSpeed = async (data: Data, isFast: boolean) => {
	const scraper = getScraper(data);
	if (!scraper) return;

	scraper.update(undefined, isFast ? FAST_TIMER : DEFAULT_TIMER);
};

const changeQuery = async (passwordHash: string, data: Data, query: object) => {
	if (!isAuth(passwordHash)) return;

	const scraper = getScraper(data);
	if (!scraper) return;

	scraper.update(query, undefined);
};

export {
	changeQuery,
	changeIntervalSpeed,
	stopScraper,
	startScraper,
	terminateScraper,
};
