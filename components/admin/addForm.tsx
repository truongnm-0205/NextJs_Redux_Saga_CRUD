import { Modal } from 'antd';
import React, { useState } from 'react'

type Props = {}

const AddForm = (props: any) => {
    const {user, register, onOk } = props
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password,setPassword] = useState('');
    const [role, setRole] = useState('user');
    const submitHandler = (e:any) => {
        e.preventDefault();
        let data= {email,name,password,role}
        console.log(data);
        
        register(data)
        onOk()
    }
  return (
    <>
           <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control"
                        
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                </div>
                <div className="mb-3">
                    <label  className="form-label">Tên người dùng</label>
                    <input 
                        type="text" 
                        className="form-control"
                       
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Vai trò</label>
                    <select className="form-select" defaultValue={'user'} onChange={(e) => setRole(e.target.value)} >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Mật khẩu</label>
                    <input 
                        type="text" 
                        className="form-control"
                       
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>            
    </>
  )
}

export default AddForm