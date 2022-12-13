import StoryListItem from './storyListItem';

async function getStories() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const data = await res.json();
  return data;
}

export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function StoriesPage() {
  const stories = await getStories();


  return(
    <div>
      <h1>Stories</h1>
      <p>hi there</p>
      <ul>
        {shuffleArray(stories).slice(0,10).map((id: string)=><li key={id}>
          <StoryListItem storyId={id}></StoryListItem>
        </li>)}
      </ul>
    </div>
  )
}
