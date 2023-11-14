import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="container">
        <h1 className="text-lg font-bold">HomePage</h1>
        <Link to="/posts" className="text-blue">Go to Posts</Link>
    </div>
  )
}

export default HomePage