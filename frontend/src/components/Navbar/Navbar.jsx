import { useAuth } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const { user, dispatch } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid rgba(32, 13, 139, 0.67)" }}>
            <span style={{ marginRight: "20px" }}>Restaurant App</span>

            {user ? (
                <>
                <span style={{ marginLeft: "10px" }}>
                Hello, {user.name}
                </span>
                <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
               <button onClick={() => navigate("/login")}>
                Login
               </button>
               <button onClick={() => navigate("/register")}>
                Register
               </button>
                </>
            )}
        </nav>
    );
};

export default Navbar;