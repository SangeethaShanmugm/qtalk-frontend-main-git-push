import { useSelector } from "react-redux";
import { Outlet, Navigate} from "react-router-dom"


const PrivateRoute =() => {
 const auth = {'token': false}
return (
    auth.token ? <Outlet /> :  <Navigate  to="/login"/>
  
)

//  return auth && auth.token ? <Routes {...rest} /> : <Navigate />
}

export default PrivateRoute;