import styles from "./page.module.scss";
import StoryListItem from "./storyListItem";
import { Story } from "./page";

export default function StoriesPage({
  storiesData,
}: {
  storiesData: Story[];
}) {
  return (
    <>
      <h3 className={styles.heroTeaser}>
        The perfect cocktail for your daily breaks. Hacker news
        sprinkled with a little <pre>Math.random()</pre>. Everthing a
        grown developer needs!
      </h3>
      <ul>
        {storiesData.map((story: Story, i) => (
          <li key={i}>
            {/* @ts-expect-error Server Component */}
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
      <div className={styles.storyCloser}>
        <p>
          That&apos;s it! No more stories.. You&apos;re done for
          today.
        </p>
        <p>( ´ ▽ ` )ﾉ</p>
      </div>
    </>
  );
}
