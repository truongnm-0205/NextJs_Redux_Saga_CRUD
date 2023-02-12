import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null,
  auth:{},
  admin:{
    users:[]  
  }
}

function reducer(state = initialState, action:any) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      }

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 },
      }

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 },
      }

    case actionTypes.RESET:
      return {
        ...state,
        ...{ count: initialState.count },
      }

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data },
      }

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light },
      }

      case actionTypes.LOGIN_REQUEST:
        case actionTypes.REGISTER_USER_REQUEST:
        case actionTypes.LOAD_USER_REQUEST:
            return {
                ...{auth:{
                  loading: true,
                  isAuthenticated: false
                }}
                
            }

        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_USER_SUCCESS:
        case actionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                ...{auth:{
                  loading: false,
                  isAuthenticated: true,
                  user: action.payload
                }}
                
            }

        case actionTypes.LOGOUT_SUCCESS:
            return {
              ...{auth:{
                loading: false,
                isAuthenticated: false,
                user: null
              }}

            }

        case actionTypes.LOAD_USER_FAIL:
            return {
                ...{auth:{
                  loading: false,
                  isAuthenticated: false,
                  user: null
                },
                error: action.payload
            }}

        case actionTypes.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.LOGIN_FAIL:
        case actionTypes.REGISTER_USER_FAIL:
            return {
                ...state,
                ...{auth:{
                  loading: false,
                  isAuthenticated: false,
                  user: null
                }},
                error: action.payload
            }
            case actionTypes.UPDATE_PROFILE_REQUEST:
              case actionTypes.ADD_USER_REQUEST:
              case actionTypes.UPDATE_USER_REQUEST:
              case actionTypes.DELETE_USER_REQUEST:
                  return {
                      ...state,
                      ...{admin:{
                      loading: true
                      }}
                  }
      
              case actionTypes.UPDATE_PROFILE_SUCCESS:
              
              case actionTypes.UPDATE_USER_SUCCESS:
                  return {
                      ...state,
                      ...{admin:{
                      loading: false,
                      isUpdated: action.payload
                      }}
                  }
              
              case actionTypes.ADD_USER_SUCCESS:
                  return{
                    ...state,
                    ...{admin:{
                      loading:false,
                      user:action.payload.user,
                      success:action.payload.success
                    }}
                  }
      
              case actionTypes.DELETE_USER_SUCCESS:
                  return {
                      ...state,
                      ...{admin:{
                      loading: false,
                      isDeleted: action.payload
                      }}
                  }
      
              case actionTypes.UPDATE_PROFILE_RESET:
              case actionTypes.UPDATE_USER_RESET:
                  return {
                      ...state,
                      ...{admin:{
                      isUpdated: false
                      }}
                  }
      
              case actionTypes.DELETE_USER_RESET:
                  return {
                      ...state,
                      ...{admin:{
                      isDeleted: false
                      }}
                  }
      
              case actionTypes.UPDATE_PROFILE_FAIL:
              case actionTypes.UPDATE_USER_FAIL:
              case actionTypes.DELETE_USER_FAIL:
              case actionTypes.ADD_USER_FAIL:
                  return {
                      ...state,
                      ...{admin:{
                        loading: false,
                        error: action.payload
                      }}
                  }
                  case actionTypes.ALL_USERS_REQUEST:
                    return {
                        ...state,
                        ...{admin:{
                          loading: true,
                        }}
                        
                    }
        
                case actionTypes.ALL_USERS_SUCCESS:
                  console.log(state);
                  
                    return {
                        ...state,
                        ...{admin:{
                        loading: false,
                        users: action.payload
                        }}
                    }
        
                case actionTypes.ALL_USERS_FAIL:
                    return {
                        ...state,
                        ...{admin:{
                        loading: false,
                        error: action.payload
                        }}
                    }


    default:
      return state
  }
}

export default reducer