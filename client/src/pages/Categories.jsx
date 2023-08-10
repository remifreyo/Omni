import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'

const Categories = () => {
  const items = useSelector((state) => state.articles)
  let allCategories = []
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
              return <Button className="m-4">Music</Button>
            case 'Marketing':
              return <Button className="m-4">Marketing</Button>
            case 'Finance':
              return <Button className="m-4">Finance</Button>
            case 'Film':
              return <Button className="m-4">Film</Button>
            case 'Technology':
              return <Button className="m-4">Technology</Button>
          }
        })}
      </div>
    </div>
  )
}

export default Categories
