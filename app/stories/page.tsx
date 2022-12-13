async function getStories() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const data = await res.json();
  return data;
}

export default async function StoriesPage() {
  const stories = await getStories();


  return(
    <div>
      <h1>Stories</h1>
      <p>hi there</p>
      <ul>
      {(stories).slice(0,10).map((id: string)=><li key={id}>
        {id}
        </li>)}
      </ul>
    </div>
  )
}
