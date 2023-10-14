import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Search() {
  const items = useSelector((state) => state.articles)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const search = items.filter(
      (element) =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(search)
    e.target[0].value = ''
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className="search mt-24">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="what are you looking for?"
          type="text"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'what are you looking for?')}
          onChange={handleChange}
        />
        <Button
          type="submit"
          size="sm"
          className="rounded ml-2 bg-teritiary hover:bg-primary"
        >
          Submit!
        </Button>
      </form>
      <div className="grid grid-cols-2 searchResult">
        {!searchResults
          ? null
          : searchResults.map((result) => {
              return (
                <Link key={result._id} to={`${result._id}`} className="m-4">
                  <Card className="w-full flex-row h-80">
                    <CardHeader
                      shadow={false}
                      floated={false}
                      className="m-0 w-2/5 shrink-0 rounded-r-none"
                    >
                      <img
                        src={result.image}
                        alt="card-image"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography
                        variant="h6"
                        color="gray"
                        className="mb-4 uppercase"
                      >
                        {result.categories.length > 0
                          ? result.categories.map((category) => {
                              switch (category) {
                                case '64b7efe040d0677f80eb1d4e':
                                  return 'Music '
                                case '64b7efe740d0677f80eb1d7e':
                                  return 'Finance '
                                case '64b7efb540d0677f80eb1cbe':
                                  return 'Technology '
                                case '64b7efee40d0677f80eb1dc5':
                                  return 'Marketing '
                                case '64b7f575f4be0d3fb9bcbf84':
                                  return 'Film'
                                default:
                                  return 'None'
                              }
                            })
                          : 'None'}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2 resultTitle"
                      >
                        {result.title}
                      </Typography>
                      <Typography
                        color="gray"
                        className="mb-8 font-normal resultText"
                      >
                        {result.description.substring(0, 160)}
                        {result.description.length > 160 ? '...' : null}
                      </Typography>
                      <p className="inline-block">
                        <Button
                          variant="text"
                          className="flex items-center gap-2"
                        >
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </Button>
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              )
            })}
      </div>
    </div>
  )
}

export default Search
