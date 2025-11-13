import { useState } from "react";
import api from "../services/api"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/register", formData);
            setMessage(response.data.message);
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
        />
        <br />
        <input 
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange} 
        />
        <br />
        <input 
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        />
        <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;