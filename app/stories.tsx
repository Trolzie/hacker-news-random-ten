import StoryListItem from './storyListItem';

// todo: create a Story type

export default function StoriesPage({storiesData} : {storiesData: {}[]}) {
  return(
    <div>
      <h1>Stories</h1>
      <p>hi there!!</p>
      <ul>
        {storiesData.map((story: {}, i)=><li key={i}>
          <StoryListItem story={story} />
        </li>)}
      </ul>
    </div>
  )
}
