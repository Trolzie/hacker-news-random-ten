import StoryListItem from './storyListItem';
import { Story } from './page'

export default function StoriesPage({storiesData} : {storiesData: Story[]}) {
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
