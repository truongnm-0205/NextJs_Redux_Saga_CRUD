import { all, call, delay, put, take, takeLatest, fork, takeEvery, select } from 'redux-saga/effects'
import { actionTypes, failure, loadDataSuccess, tickClock } from './actions'
import axios from 'axios'
import setAuthToken from '@/utils/setAuthToken';


function* loadUser({type}:any):any {
  
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    
    if(localStorage["token"]){
      setAuthToken(localStorage["token"])
    }
    const { data } = yield axios.get('http://localhost:4000/api/v1/me',config)
    if(data.success){
      yield put({
        type: actionTypes.LOAD_USER_SUCCESS,
        payload: data.user
    })
    console.log(data.user)
    }

  } catch (error) {
    yield put (failure(error))
  }
}


function *logout():any{
  localStorage.removeItem("token")
  setAuthToken(null);
  yield put({
    type: actionTypes.LOGIN_SUCCESS,
    
})
}

function* login({payload}:any):any{
  try {
  
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }


    

    const { data } = yield axios.post('http://localhost:4000/api/v1/login', { email:payload.email, password:payload.password }, config)
     
    console.log(data)
    if(data.success){
      yield localStorage.setItem("token",data.token)
      yield put({type: actionTypes.LOGIN_SUCCESS,payload: data.user})
    }

  } catch (error) {
    yield put(failure(error))
  }
}

function* register({payload}:any):any{
  try {
  
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }

    const { data } = yield axios.post('http://localhost:4000/api/v1/register', { name:payload.name ,email:payload.email, password:payload.password}, config)
     
    console.log(data)
    if(data.success){
      yield localStorage.setItem("token",data.token)
      yield put({type: actionTypes.REGISTER_USER_SUCCESS,payload: data.user})
    }

  } catch (error) {
    yield put(failure(error))
  }
}
 
function* allUsers({payload}:any):any{
  const {keyword,currentPage,role} = payload
 
  try {

    let link = `http://localhost:4000/api/v1/admin/users?keyword=${keyword}&page=${currentPage}`
    if(role){
      link = `http://localhost:4000/api/v1/admin/users?keyword=${keyword}&page=${currentPage}&role=${role}`
    }
    const { data } = yield axios.get(link)
    if(data.success){
      yield put ({
        type: actionTypes.ALL_USERS_SUCCESS,
        payload: data
      })
    }


    
  } catch (error) {
    yield put(failure(error))
  }
  

}

function* addUser({payload}:any):any{
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    
    const { data } = yield axios.post(`http://localhost:4000/api/v1/admin/user/new`, payload.userData, config)
    if(data.success)
        yield put({
            type: actionTypes.ADD_USER_SUCCESS,
            payload: data
        })
  } catch (error) {
    yield put(failure(error))
  }
}


function* updateUser({payload}:any):any{
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    
    const { data } = yield axios.put(`http://localhost:4000/api/v1/admin/user/${payload.id}`, payload.userData, config)
    if(data.success)
        yield put({
            type: actionTypes.UPDATE_USER_SUCCESS,
            payload: data.success
        })
  } catch (error) {
    yield put(failure(error))
  }
}

function* deleteUser({payload}:any):any{
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    
    const { data } = yield axios.delete(`http://localhost:4000/api/v1/admin/user/${payload.id}`)
    if(data.success)
        yield put({
            type: actionTypes.DELETE_USER_SUCCESS,
            payload: data.success
        })
  } catch (error) {
    yield put(failure(error))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_USER_REQUEST,loadUser),
    takeLatest(actionTypes.LOGOUT_REQUEST,logout),
   
    takeLatest(actionTypes.LOGIN_REQUEST,login),
    takeLatest(actionTypes.REGISTER_USER_REQUEST,register),

    takeLatest(actionTypes.ALL_USERS_REQUEST,allUsers),
    takeLatest(actionTypes.UPDATE_USER_REQUEST,updateUser),
    takeLatest(actionTypes.DELETE_USER_REQUEST,deleteUser),
    takeLatest(actionTypes.ADD_USER_REQUEST,addUser)
    
  ])
}

export default rootSaga