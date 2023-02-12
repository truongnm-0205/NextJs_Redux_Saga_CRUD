 export const actionTypes = {
    FAILURE: 'FAILURE',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET',
    LOAD_DATA: 'LOAD_DATA',
    LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
    START_CLOCK: 'START_CLOCK',
    TICK_CLOCK: 'TICK_CLOCK',
    HYDRATE: 'HYDRATE',
    LOGIN_REQUEST : 'LOGIN_REQUEST',
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    LOGIN_FAIL : 'LOGIN_FAIL',

    REGISTER_USER_REQUEST : 'REGISTER_USER_REQUEST',
    REGISTER_USER_SUCCESS : 'REGISTER_USER_SUCCESS',
    REGISTER_USER_FAIL : 'REGISTER_USER_FAIL',

    LOAD_USER_REQUEST : 'LOAD_USER_REQUEST',
    LOAD_USER_SUCCESS : 'LOAD_USER_SUCCESS',
    LOAD_USER_FAIL : 'LOAD_USER_FAIL',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL :'LOGOUT_FAIL',
    UPDATE_PROFILE_REQUEST:'UPDATE_PROFILE_REQUEST',
    UPDATE_PROFILE_SUCCESS:'UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_RESET:'UPDATE_PROFILE_RESET',
    UPDATE_PROFILE_FAIL:'UPDATE_PROFILE_FAIL',

    ALL_USERS_REQUEST:'ALL_USERS_REQUEST',
    ALL_USERS_SUCCESS:'ALL_USERS_SUCCESS',
    ALL_USERS_FAIL:'ALL_USERS_FAIL',

    USER_DETAILS_REQUEST:'USER_DETAILS_REQUEST',
    USER_DETAILS_SUCCESS:'USER_DETAILS_SUCCESS',
    USER_DETAILS_FAIL:'USER_DETAILS_FAIL',

    ADD_USER_REQUEST:'ADD_USER_REQUEST',
    ADD_USER_SUCCESS:'ADD_USER_SUCCESS',
    ADD_USER_RESET:'ADD_USER_RESET',
    ADD_USER_FAIL:'ADD_USER_FAIL',
    
    
    UPDATE_USER_REQUEST:'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS:'UPDATE_USER_SUCCESS',
    UPDATE_USER_RESET:'UPDATE_USER_RESET',
    UPDATE_USER_FAIL:'UPDATE_USER_FAIL',

    DELETE_USER_REQUEST:'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS:'DELETE_USER_SUCCESS',
    DELETE_USER_RESET:'DELETE_USER_RESET',
    DELETE_USER_FAIL:'DELETE_USER_FAIL',
  }
  
  export function failure(error:any) {
    return {
      type: actionTypes.FAILURE,
      error,
    }
  }
  
  export function increment() {
    return { type: actionTypes.INCREMENT }
  }
  
  export function decrement() {
    return { type: actionTypes.DECREMENT }
  }
  
  export function reset() {
    return { type: actionTypes.RESET }
  }
  
  export function loadData() {
    return { type: actionTypes.LOAD_DATA }
  }
  
  export function loadDataSuccess(data:any) {
    return {
      type: actionTypes.LOAD_DATA_SUCCESS,
      data
    }
  }
  
  export function startClock() {
    return { type: actionTypes.START_CLOCK }
  }
  
  export function tickClock(isServer:any) {
    return {
      type: actionTypes.TICK_CLOCK,
      light: !isServer,
      ts: Date.now(),
    }
  }

  export function login(data:any) {
    return {type: actionTypes.LOGIN_REQUEST,payload:data}
  }

  export function logout() {
    return {type: actionTypes.LOGOUT_REQUEST}
  }

  export function register(data:any) {
    return {type: actionTypes.REGISTER_USER_REQUEST,payload:data}
  }

  export function loadUser() {
    return { type: actionTypes.LOAD_USER_REQUEST }
  }

  export function allUsers(query:any) {
    return {type: actionTypes.ALL_USERS_REQUEST,payload:query}
  }

  export function updateUser(id:any,userData:any){
    return {type: actionTypes.UPDATE_USER_REQUEST,payload:{id,userData}}
  }

  export function addUser(userData:any){
    return {type: actionTypes.ADD_USER_REQUEST,payload:{userData}}
  }

  export function deleteUser(id:any){
    return {type: actionTypes.DELETE_USER_REQUEST,payload:{id}}
  }

