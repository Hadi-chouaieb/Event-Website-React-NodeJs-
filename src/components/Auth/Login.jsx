import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import "./aut.css";
import Loader from "../Loding/loader";
import Cookies from "js-cookie";
function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" }); // Alert state
    const navigate = useNavigate();

    // Handle Input


    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle Registration


    // Handle Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                "the link to the api",
                {
                    params: {
                        Mail: loginData.email,
                        Password: loginData.password,
                    }
                }
            );
            if (response.data.token) {
                Cookies.set("__stripedSelPower", response.data.token)
                window.location.reload();
            } else {
                setAlert({ message: "Invalid credentials. Please try again.", type: "danger" });
            }
        } catch (error) {
            setAlert({ message: "Invalid credentials. Please try again.", type: "danger" });
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" row">

            <div className="d-flex justify-content-center col-12">

                {loading ? (
                    <Loader />
                ) : (
                    <div className="col-12 col-md-6  ">
                        {alert.message && (
                            <div className="alerts d-flex justify-content-center" role="alert">
                                <span type="button" className="btn-close mt-4" data-bs-dismiss="alert" onClick={() => setAlert({})}></span>
                                {alert.message}

                            </div>
                        )}
                        <div>
                            <div className="signup">
                                <form onSubmit={handleLoginSubmit} method="post">
                                    <label htmlFor="chk" aria-hidden="false" className="TheTitle">
                                        Login
                                    </label>
                                    <input
                                        className="inputHack col-12 mt-5"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                    />
                                    <input
                                        className="inputHack col-12"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                    />
                                    <button type="submit" className="col-12 ">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Login;
