import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [message, setMessage] = useState("");

    // Define the callback function and attach it to the window object
    useEffect(() => {
        window.handleRecaptcha = (token) => {
            setRecaptchaToken(token);
        };

        // Load reCAPTCHA script
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            delete window.handleRecaptcha; // Clean up the global function
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setMessage("Please complete the reCAPTCHA.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/register", {
                ...formData,
                recaptchaResponse: recaptchaToken,
            });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || "Registration failed.");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div
                    className="g-recaptcha"
                    data-sitekey="6LfyBfwqAAAAANLziwcCpULcsp-DvI3xGZQZD8Ci"
                    data-callback="handleRecaptcha" // Use the global function name
                ></div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationForm;