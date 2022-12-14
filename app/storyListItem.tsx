import styles from "./page.module.scss";
import Image from "next/image";
import hackerNewsStoryImagePlaceholder from "../public/hackernews.png";
import { Story } from "./page";
import Date from "./date";

async function getAuthor(storyBy: string) {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${storyBy}.json`
  );
  const data = await res.json();
  return data;
}

export default async function StoryListItem({
  story,
}: {
  story: Story;
}) {
  // const story = await getStory(storyId)
  const author = await getAuthor(story.by);

  return (
    <article>
      <div className={styles.contentWrapper}>
        <header className={styles.articleHeader}>
          <div>
            <span className={styles.storyAuthor}>{author.id}</span>{" "}
            <span
              className={styles.authorKarma}
              title='author karma score'
            >
              / &#9775; {author.karma}
            </span>
          </div>
          <Date dateString={story.time} />
        </header>
        <h2 className={styles.storyTitle}>{story.title}</h2>
        <span>
          <a
            className={styles.readMoreLink}
            href={story.url}
            target='_blank'
            rel='noreferrer'
          >
            Read Story on Hacker News...
          </a>
        </span>
      </div>
      <div>
        <div className={styles.storyImageWrapper}>
          <Image
            src={hackerNewsStoryImagePlaceholder}
            alt='Hacker news placeholder image'
            width={305}
            height={165}
          />
          <div className={styles.imageOverlay}></div>
        </div>
      </div>
      <div className={styles.storyScore}>
        <span>{story.score}</span>
      </div>
    </article>
  );
}
