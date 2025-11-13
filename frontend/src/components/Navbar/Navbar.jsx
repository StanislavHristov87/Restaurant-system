import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useAuth();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
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
                <span style={{ marginRight: "10px" }}>You are not logged in</span>
                </>
            )}
        </nav>
    );
};

export default Navbar;