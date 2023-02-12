import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/layout';
import { wrapper } from '../redux/store'

import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { loadUser } from '@/redux/actions';
import Header from '@/components/layout/header';
function App({ Component, pageProps }: AppProps) {


  
  return(
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
    </>
  )


}


export default wrapper.withRedux(App)

