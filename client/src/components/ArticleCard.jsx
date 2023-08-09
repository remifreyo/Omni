import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'

const ArticleCard = () => {
  const items = useSelector((state) => state.articles).slice(5, 20)
  return (
    <div className="article-card">
      {items.map((item) => {
        return (
          <Card className="mt-6 w-96 mb-12 mr-2">
            <Link to={`${item._id}`}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={item.image} />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 h-32"
                >
                  {item.title}
                </Typography>
                <div>
                  Published:{' '}
                  {new Date(item.createdAt).toLocaleString('en-us', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button className="bg-teritiary">Read More</Button>
              </CardFooter>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}

export default ArticleCard
