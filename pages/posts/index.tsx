import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getPosts } from "../api/post";
import axios from "axios";
import Post from "../../components/post/post";

export interface IPost{
  username:string,
  title:string,
  content:string,
  _id: Object
}


export default function Posts({posts} :InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts)
  return (
    <>
      <main>
        <title>Các bài đăng</title>
        <section className="container">
          <div className="">
            {!!posts && posts.map((post: IPost) => <Post key={post._id.toString()} post={post}/>)}
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
    const res = await getPosts()
    return {
      props: {
          posts: res
      },
  };
    
}
