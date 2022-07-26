import {useState, useEffect} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'
// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isActive: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isActive: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isActive: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isActive: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isActive: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isActive: false,
  },
]

// Replace your code here
const App = () => {
  const [task, setTask] = useState()
  const [tagsArr, setTagsList] = useState(tagsList)
  const [tag, setTag] = useState(tagsList[0].optionId)
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('')
  const submitForm = formProps => {
    if (task) {
      setList([
        ...list,
        {id: uuidv4(), task: formProps.task, tag: formProps.tags},
      ])
      setTag(formProps.tags)
      setTask('')
    }
  }

  useEffect(() => {
    if (tagsArr.every(item => !item.isActive)) {
      setFilter('')
    }
  }, [tagsArr])

  return (
    <div>
      <h1>Create a Task!</h1>
      <form
        onSubmit={e => {
          const formData = new FormData(e.target)
          const formProps = Object.fromEntries(formData)
          e.preventDefault()
          submitForm(formProps)
        }}
      >
        <label htmlFor="task">Task</label>
        <input
          value={task}
          name="task"
          type="text"
          placeholder="Enter the task here"
          onChange={e => {
            setTask(e.target.value)
          }}
        />
        <label htmlFor="tags">Tags</label>
        <select name="tags">
          {tagsList.map(item => (
            <option key={item.optionId} value={item.optionId}>
              {item.displayText}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
      <h1>Tags</h1>
      <ul>
        {tagsArr.map(item => (
          <li key={item.optionId}>
            <button
              style={{color: item.isActive ? 'blue' : 'red'}}
              onClick={() => {
                setFilter(item.optionId)
                setTagsList(
                  tagsArr.map(obj => {
                    if (obj.optionId === item.optionId) {
                      return {...obj, isActive: !obj.isActive}
                    }
                    return obj
                  }),
                )
              }}
              type="button"
            >
              {item.displayText}
            </button>
          </li>
        ))}
      </ul>

      <h1>Tasks</h1>
      <div>
        {list.length ? (
          <ul>
            {!filter
              ? list.map(item => (
                  <li key={item.id}>
                    <p>{item.task}</p>
                    <p>{item.tag}</p>
                  </li>
                ))
              : list
                  .filter(item => item.tag === filter)
                  .map(item => (
                    <li key={item.id}>
                      <p>{item.task}</p>
                      <p>{item.tag}</p>
                    </li>
                  ))}
          </ul>
        ) : (
          <h1>No Tasks Added Yet</h1>
        )}
      </div>
    </div>
  )
}

export default App
