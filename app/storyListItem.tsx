import Image from 'next/image'
import hackerNewsStoryImagePlaceholder from '../public/hackernews.png';

async function getAuthor(storyBy: string) {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${storyBy}.json`);
  const data = await res.json();
  return data;
}

export default async function StoryListItem({story}: {story: {}}) {
  // const story = await getStory(storyId)
  const author = await getAuthor(story.by)

  return (
    <div>
      <h2>
        score: {story.score}
      </h2>
      title: {story.title}
      URL: {story.url}
      time: {story.time}
      score: {story.score}
      authorid: {author.id}
      karma: {author.karma}
      <Image src={hackerNewsStoryImagePlaceholder} alt="Hacker news placeholder image" width={200} height={50} />
    </div>
  );
}
