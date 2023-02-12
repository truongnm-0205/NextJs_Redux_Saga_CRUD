import Header from "./header";
import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadData, loadUser,logout } from '@/redux/actions'
import { GetStaticProps } from 'next'
import { wrapper } from '@/redux/store'
import { END } from 'redux-saga'
export default function Layout({ children } :any) {
  const { user, loading, isAuthenticated } = useSelector((state:any) => state.auth)
  const dispatch = useDispatch()
//   useEffect(() => {

//     dispatch(loadUser())
// }, [dispatch])
    return (
      <>
        <Header user={user} />
        <main>{children}</main>
      </>
    )
  }


  export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => () => {
   
      store.dispatch(loadUser())
      store.dispatch(END)
    
  })  

  