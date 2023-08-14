import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react'

const Categories = () => {
  const items = useSelector((state) => state.articles)
  let allCategories = []
  const [results, setResults] = useState(items)

  const handleClick = (e) => {
    let category = e.target.innerText.toLowerCase()
    switch (category) {
      case 'marketing':
        setResults(
          items.filter((item) =>
            item.categories.includes('64b7efee40d0677f80eb1dc5')
          )
        )
        break
      case 'finance':
        setResults(
          items.filter((item) =>
            item.categories.includes('64b7efe740d0677f80eb1d7e')
          )
        )
        break
      case 'technology':
        setResults(
          items.filter((item) =>
            item.categories.includes('64b7efb540d0677f80eb1cbe')
          )
        )
        break
      case 'music':
        setResults(
          items.filter((item) =>
            item.categories.includes('64b7efe040d0677f80eb1d4e')
          )
        )
        break
      case 'film':
        setResults(
          items.filter((item) =>
            item.categories.includes('64b7f575f4be0d3fb9bcbf84')
          )
        )
        break
    }
  }
  useEffect(() => {
    setResults(items)
  }, [items])
  return (
    <div className="categories">
      {items.map((item) => {
        item.categories.map((category) => {
          switch (category) {
            case '64b7efe040d0677f80eb1d4e':
              return !allCategories.includes('Music')
                ? allCategories.push('Music')
                : null
            case '64b7efe740d0677f80eb1d7e':
              return !allCategories.includes('Finance')
                ? allCategories.push('Finance')
                : null
            case '64b7efb540d0677f80eb1cbe':
              return !allCategories.includes('Technology')
                ? allCategories.push('Technology')
                : null
            case '64b7efee40d0677f80eb1dc5':
              return !allCategories.includes('Marketing')
                ? allCategories.push('Marketing')
                : null
            case '64b7f575f4be0d3fb9bcbf84':
              return !allCategories.includes('Film')
                ? allCategories.push('Film')
                : null
          }
        })
      })}
      <div>
        {allCategories.map((category) => {
          switch (category) {
            case 'Music':
              return (
                <Button className="m-4" onClick={handleClick}>
                  Music
                </Button>
              )
            case 'Marketing':
              return (
                <Button className="m-4" onClick={handleClick}>
                  Marketing
                </Button>
              )
            case 'Finance':
              return (
                <Button className="m-4" onClick={handleClick}>
                  Finance
                </Button>
              )
            case 'Film':
              return (
                <Button className="m-4" onClick={handleClick}>
                  Film
                </Button>
              )
            case 'Technology':
              return (
                <Button className="m-4" onClick={handleClick}>
                  Technology
                </Button>
              )
          }
        })}
      </div>
      <div className="grid grid-cols-2 w-full">
        {results
          ? results.map((result) => {
              return (
                <Link to={`/${result._id}`} className="m-4">
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
                        className="mb-2"
                      >
                        {result.title}
                      </Typography>
                      <Typography color="gray" className="mb-8 font-normal">
                        {result.description.substring(0, 160)}
                        {result.description.length > 160 ? '...' : null}
                      </Typography>
                      <a href="#" className="inline-block">
                        <Button
                          variant="text"
                          className="flex items-center gap-2"
                        >
                          Read Post
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
                      </a>
                    </CardBody>
                  </Card>
                </Link>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Categories
