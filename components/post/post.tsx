import { IPost } from "@/pages/posts"
import Link from "next/link"

interface Props{
    post:IPost
}
  

const Post = (props:Props) => {
  const post = props.post
  return (
    <>
        <div className="card border-primary mb-3" >
            <div className="card-header">{post.username}</div>
            <div className="card-body text-primary">
                <h5 className="card-title">{post.title}</h5>
                <Link href={`/posts/${post._id}`} className="btn btn-primary">Xem chi tiết</Link>
            </div>
        </div>
    </>
  )
}

export default Post