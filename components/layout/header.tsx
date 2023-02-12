import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadData, loadUser,logout } from '@/redux/actions'
import { GetStaticProps } from 'next'
import { wrapper } from '@/redux/store'
import { END } from 'redux-saga'
import setAuthToken from '@/utils/setAuthToken'
import { Button } from 'antd'
type Props = {

}

const Header = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    //const { user, loading, isAuthenticated } = useSelector((state:any) => state.auth)
    const {user} = props
    
    const handleClick = (e:any) => {
        e.preventDefault()
        if(router.pathname !== '/')
            router.push("http://localhost:3000/")
      }

  return (
    <>
        <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Button onClick={(e) => handleClick(e)} type='dashed'>Trang chủ</Button></li>

            </ul>
           
            {user ?
            <div className="col-md-6 text-end">
                 {user.role === 'admin' && 
                    <button  type="button" className="btn btn-outline-primary me-2">
                        <Link href={'/admin/users'}>Quản lí người dùng</Link>
                        
                    </button>
                }
                <button type="button" className="btn btn-outline-primary me-2">
                    {user.name}
                </button>
                <button onClick={() => {dispatch(logout());router.push('/')}} type="button" className="btn btn-outline-primary me-2">
                    Đăng xuất
                </button>
            </div>:
            <div className="col-md-6  text-end">
            <Link href='/login'>
                <button type="button" className="btn btn-outline-primary me-2">
                    Đăng nhập
                </button>
            </Link>
            <Link href='/register'>
                <button type="button" className="btn btn-outline-primary me-2">
                    Đăng ký
                </button>
            </Link>
        </div>
            }
        </header>
    </>
  )
}

export default Header

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => () => {
//     store.dispatch(loadUser())
//     store.dispatch(END)
    
//   })

