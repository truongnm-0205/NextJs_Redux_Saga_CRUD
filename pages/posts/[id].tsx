import React from 'react'
import { IPost } from '.'
import { getPost, getPosts } from '../api/post'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next"
import Link from 'next/link'

interface Props {
  post: IPost
  
}

export default function Post(props:Props) {
  return (
    <div className='container mt-4'>
      
      <div className="card">
        <div className="card-header">
          <h5>{props.post.title}</h5>
          
        </div>
        <div className="card-body">
          
          <p className="card-text">{props.post.content}</p>
          <Link href="/posts" className="btn btn-primary">Về danh sách bài đăng</Link>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
   
    const posts = await getPosts()
  
    const paths = posts.map((post:IPost) => ({
        params: { id: post._id.toString() }
      
    }))
  
    return { paths, fallback: false }
  }

  export const getStaticProps: GetStaticProps = async ({params}:any) => {

    
    const post = await getPost(params.id)
    return { props: { post } }
  }