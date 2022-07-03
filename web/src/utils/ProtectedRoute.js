import {Navigate} from "react-router-dom";
import { useAccount } from "./useAccount";
const ProtectedRoute = ({ children, ...rest }) => {
    const {sid} = useAccount();
    console.log(sid);
    if (!sid) {
      return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;
