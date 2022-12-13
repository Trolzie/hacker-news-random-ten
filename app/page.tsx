import Image from 'next/image';
import styles from './page.module.scss';
import Stories from './stories';
import { getRandomizedArraySlice } from './helpers'

async function fetchStoriesId() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const data = await res.json();
  return data;
}

async function fetchStoriesData(storyIds: number[]) {
  const requests = storyIds.map((storyId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)); 
  const responses = await Promise.all(requests); 
  const promises = responses.map((response) => response.json());
  return await Promise.all(promises);
}

export default async function HomePage() {
  const storiesId = await fetchStoriesId();
  const storyIdsRandomzied = getRandomizedArraySlice(storiesId, 10);
  const storiesDataRandomized = await fetchStoriesData(storyIdsRandomzied);

  // sort by score in ascending order:
  storiesDataRandomized.sort((a, b) => (a.score > b.score) ? 1 : -1)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Random Hacker News!
        </h1>
        <Stories storiesData={await storiesDataRandomized}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
