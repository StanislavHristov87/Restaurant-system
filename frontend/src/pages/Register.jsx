import { useState } from "react";
import api from "../services/api"
import { useAuth } from "../context/AuthContext";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
     const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { dispatch } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("")

        try {
            const response = await api.post("/users/register", formData);
            setMessage("Registration successful !");

                dispatch({ 
                    type: "REGISTER",
                 payload: {
                    user: response.data.user,
                     token: response.data.token,
                    }, 
                    });
            
        } catch (error) {
            setMessage(error.response?.data?.message || "Error with registration ! ");
        }
    };

    return (
        <div style={{maxWidth: "400px", margin: "50px auto"}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        />
        <br />
        <input 
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        />
        <br />
        <input 
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        />
        <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;