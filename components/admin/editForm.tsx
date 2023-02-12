import { Modal } from 'antd';
import React, { useState } from 'react'

type Props = {}

const EditForm = (props: any) => {
    const {user, updateUser, onOk } = props
    const [email, setEmail] = useState(user?.email);
    const [name, setName] = useState(user?.name);
    const [role, setRole] = useState(user?.role);
    const submitHandler = (e:any) => {
        e.preventDefault();
        let data= {email,name,role}
        console.log(data);
        
        updateUser(user._id,data)
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
                        defaultValue={user?.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                </div>
                <div className="mb-3">
                    <label  className="form-label">Tên người dùng</label>
                    <input 
                        type="text" 
                        className="form-control"
                        defaultValue={user?.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Vai trò</label>
                    <select className="form-select" defaultValue={user?.role} onChange={(e) => setRole(e.target.value)} >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>            
    </>
  )
}

export default EditForm