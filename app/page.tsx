import Image from 'next/image';
import styles from './page.module.scss';
// import Stories from './stories';

async function fetchStoriesId() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const data = await res.json();
  return data;
}

// async function getStory(storyId: string) {
//   const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
//   const data = await res.json();
//   return data;
// }

export function getTenRandomStoryIds(array: string[]) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randomizeArrayWithLength = (arr: string[], n: number) => {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError('randomizeArrayWithLength: more elements taken than available');
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

async function fetchStoriesData(storyIds: string[]) {
  const requests = storyIds.map((storyId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)); 
  const responses = await Promise.all(requests); 
  const promises = responses.map((response) => response.json());
  return await Promise.all(promises);
}

export default async function HomePage() {
  const storiesId = await fetchStoriesId();
  const storyIdsRandomzied = randomizeArrayWithLength(storiesId, 10);
  const storiesDataRandomized = await fetchStoriesData(storyIdsRandomzied)

  storiesDataRandomized.sort((a, b) => (a.score > b.score) ? 1 : -1)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Random Hacker News!
        </h1>
        data here:
          {(await storiesDataRandomized).map((item, i) => <p key={i}>{item['score']}</p>)}
        datastop
        {/* <Stories storyIds={tenRandomStoryIds}/> */}

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
