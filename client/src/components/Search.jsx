import { Input, Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function Search() {
  const items = useSelector((state) => state.articles)
  const [searchTerm, setSearchTerm] = useState('')
  const handleSubmit = (e) => {
    let searchResults = items.filter(
      (element) =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="what are you looking for?"
          type="text"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'what are you looking for?')}
          onChange={handleChange}
        />
        <Button type="submit" size="sm" className="rounded ml-2 bg-teritiary">
          Submit!
        </Button>
      </form>
    </div>
  )
}

export default Search
