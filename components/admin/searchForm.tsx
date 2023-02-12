import { Modal } from 'antd';
import React, { useState } from 'react'

type Props = {}

const SearchForm = (props: any) => {
    const {user, register, onOk } = props
    const [text, setText] = useState('');
    const [role, setRole] = useState('user');
    const submitHandler = (e:any) => {
        e.preventDefault();
        let data= {text,role}
        console.log(data);
        
        register(data)
        onOk()
    }
  return (
    <>
           <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Tìm kiếm</label>
                    <input 
                        type="email" 
                        className="form-control"
                        
                        onChange={(e) => setText(e.target.value)}
                    />
                    
                </div>
                <div className="mb-3">
                    <label  className="form-label">Vai trò</label>
                    <select className="form-select" defaultValue={'user'} onChange={(e) => setRole(e.target.value)} >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>            
    </>
  )
}

export default SearchForm