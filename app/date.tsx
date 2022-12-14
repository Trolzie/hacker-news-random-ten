import { format } from "date-fns";
import styles from "./page.module.scss";

export default function Date({ dateString }: { dateString: number }) {
  const date = format(dateString * 1000, "LLLL d, yyyy"); // unix timestamp, so we multiply by 1000

  return (
    <time className={styles.storyDate} dateTime={date}>
      {date}
    </time>
  );
}
