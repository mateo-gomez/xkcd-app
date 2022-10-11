import algoliasearch from "algoliasearch";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);

const algoliaIndex = client.initIndex("prod_comics");

const SEARCH_CACHE = {};

export async function search({ query }) {
  if (SEARCH_CACHE[query]) return { results: SEARCH_CACHE[query] };

  const { hits } = await algoliaIndex.search(query, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });

  SEARCH_CACHE[query] = hits;

  return { results: hits };
}
