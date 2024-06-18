import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {

  const content = useField('text')
  const { reset: _, ...contentProps } = content
  const author = useField('text')
  const { reset: __, ...authorProps } = author
  const info = useField('text')
  const { reset: ___, ...infoProps } = info
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const resetAll = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew  