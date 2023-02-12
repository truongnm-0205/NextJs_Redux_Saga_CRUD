
import React, { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../../redux/actions'
type Props = {}

const Register = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector((state:any) => state.auth);

    const router = useRouter()


    const submitHandler = (e:any) => {
        e.preventDefault();
        console.log({email, password, name});
        
        dispatch(register({email, password, name}))
        router.push('/')
    }
  return (
    <>
        <div className='container' style={{width: '400px'}}>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="examplx`eInputPxassword1" className="form-label">Mật khẩu</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Đăng ký</button>
            </form>
        </div>
    </>
  )
}

export default Register