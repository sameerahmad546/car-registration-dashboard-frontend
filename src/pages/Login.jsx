
import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/states";

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD",
        },
        body: JSON.stringify(userData),
    };
    const [error, setError] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", requestOptions);
            const result = await response.json();
            console.log(result)
            if(result.message === 'No user found'){
                setError('No user found')
            }
            else if(result.message === 'Invalid Password'){
                setError('Invalid Password')
            }
            else if(result.message === 'Login Successfully'){
                setUser(result.user)
                localStorage.setItem('token', JSON.stringify({user: result.user, token: result.token}))
                navigate('/')
            }
        } catch (error) {
            console.log("Caught in Erro : ", error)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
