import { useState } from "react";
import api from "../services/api"

const LoginPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    try {
        const response = await api.post("/users/login", formData);
        setMessage("Login successful !");
        console.log("User data", response.data);

        localStorage.setItem("token", response.data.token);
        
    } catch (error) {
        setMessage(error.response?.data?.message || "Error login !");
    }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    )
}

export default LoginPage;