import Link from "next/link";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { wrapper } from '../redux/store'
import { loadData, loadUser } from '../redux/actions'

import { GetStaticProps } from "next";
import { GetStaticPropsCallback } from "next-redux-wrapper";
import { GetStaticPropsContext } from "next";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const { user, isAuthenticated, loading } = useSelector((state:any) => state.auth)

  return (
    <>
      <main>
        <title>Trang chủ</title>
        <section>
          <div className="text-center">
            <h1>Chào mừng đến với blog</h1>
            <Link href={`/posts`} className="btn btn-primary">Đi đến danh sách bài đăng</Link>
           
          </div>
          
        </section>
      </main>
    </>
  )
}

