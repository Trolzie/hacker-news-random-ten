import StoryListItem from "./storyListItem";
import { Story } from "./page";

export default function StoriesPage({
  storiesData,
}: {
  storiesData: Story[];
}) {
  return (
    <div>
      <h1>Stories</h1>
      <ul>
        {storiesData.map((story: Story, i) => (
          <li key={i}>
            {/* @ts-expect-error Server Component */}
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
    </div>
  );
}
