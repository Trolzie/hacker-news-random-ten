async function getStory(storyId: string) {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
  const data = await res.json();
  return data;
}

async function getAuthor(storyBy: string) {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${storyBy}.json`);
  const data = await res.json();
  return data;
}

export default async function StoryListItem({storyId}: {storyId: string}) {
  const story = await getStory(storyId)
  const author = await getAuthor(story.by)

  return (
    <div>
      title: {story.title}
      URL: {story.url}
      time: {story.time}
      score: {story.score}
      authorid: {author.id}
      karma: {author.karma}
    </div>
  );
}
