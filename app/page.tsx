import Image from "next/image";
import styles from "./page.module.scss";
import Stories from "./stories";
import { getRandomizedArraySlice } from "./helpers";

async function fetchStoriesId() {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const data = await res.json();
  return data;
}

export type Story = {
  by: string;
  descendants: string;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

async function fetchStoriesData(storyIds: number[]) {
  const requests = storyIds.map((storyId) =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    )
  );
  const responses = await Promise.all(requests);
  const promises = responses.map((response) => response.json());
  return await Promise.all(promises);
}

export default async function HomePage() {
  const storiesId: number[] = await fetchStoriesId();
  const storyIdsRandomzied: number[] = getRandomizedArraySlice(
    storiesId,
    10
  );
  const storiesDataRandomized: Story[] = await fetchStoriesData(
    storyIdsRandomzied
  );

  // sort by score in ascending order:
  storiesDataRandomized.sort((a, b) => (a.score > b.score ? 1 : -1));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Random Hacker News</h1>
        <Stories storiesData={await storiesDataRandomized} />
      </main>

      <footer className={styles.footer}>
        made from &#x1F9E1; and &#9749;
      </footer>
    </div>
  );
}
