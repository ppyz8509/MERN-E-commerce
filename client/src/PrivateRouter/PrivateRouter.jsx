import React ,{Children, useContext} from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'


const PrivateRouter = () => {
    const {user} = useContext(AuthContext)
    const location =useLocation()
    if (user) {
        return Children
    }
  return <Navigate to="/signin" state={{ from: location }} replace/>
}
export default PrivateRouter