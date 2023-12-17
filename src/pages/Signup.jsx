
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate()
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD",
        },
        body: JSON.stringify(userData),
    };

    const handleSignup = async (e) => {
        console.log(e)
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", requestOptions);
            const result = await response.json();
            console.log(result)
            if(result.message === 'User Created Successfully'){
                setSuccess("Registered Successfully, Your password has been sent to your email")
                setTimeout(() => {
                    navigate("/login")
                }, 5000);
            }
            else if(result.message === 'User already exists'){
                setError('User already exists')
            }
            
        } catch (error) {
            setError("Failed to create an account. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 mb-4 border"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                   
                    <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
