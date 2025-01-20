import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./aut.css";
import Loader from "../Loding/loader";
import Cookies from "js-cookie";
function Register() {







    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        university: "",
        member: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" }); // Alert state
    const navigate = useNavigate();

    // Handle Input

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle Registration
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "the link to the api",
                {
                    FullName: registerData.username,
                    Mail: registerData.email,
                    Password: registerData.password,
                    University: registerData.university,
                    Member: registerData.member,
                    PhoneNumber: registerData.phone,
                }

            );
            setAlert({ message: "Registration successful!", type: "success" });


        } catch (error) {
            setAlert({ message: "Error during registration. Please try again.", type: "danger" });
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }

    };

    // Handle Login








    return (

        <div className=" row ">

            <div className="d-flex justify-content-center col-12">

                {loading ? (
                    <Loader />
                ) : (


                    <div className=" col-12 col-md-6">
                        {alert.message && (
                            <div className="alerts  d-flex justify-content-center" role="alert">
                                <span type="button" className="btn-close mt-4" data-bs-dismiss="alert" onClick={() => setAlert({})}></span>
                                {alert.message}

                            </div>
                        )}



                        <span className="coverRotation"></span>


                        {/* Sign-Up Form */}
                        <div className="signup container">
                            <form onSubmit={handleRegisterSubmit} method="post" >
                                <label htmlFor="chk" aria-hidden="true" className="TheTitle">
                                    Sign up
                                </label>
                                <input
                                    className="inputHack col-12  "
                                    type="text"
                                    name="username"
                                    placeholder="Full name"
                                    required
                                    value={registerData.username}
                                    onChange={handleRegisterChange}
                                />
                                <input
                                    className="inputHack col-12  "
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                />
                                <input
                                    className="inputHack col-12  "
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                />
                                <input
                                    className="inputHack col-12  "
                                    type="text"
                                    name="university"
                                    placeholder="University"
                                    required
                                    value={registerData.university}
                                    onChange={handleRegisterChange}
                                />
                                <input
                                    className="inputHack col-12  "
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                />

                                {/* Member Selection */}

                                <select
                                    id="memberSelect"
                                    name="member"
                                    required
                                    value={registerData.member}
                                    onChange={handleRegisterChange}
                                    className="col-12"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Are you an MTC member?
                                    </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>


                                <div class="">
                                    <label class="custom-checkbox">
                                        <input type="checkbox" class="form-check-input" value={"Yes"} name="terms" required />
                                        {/* <span class="checkmark"></span> */}
                                        I agree to the <Link to={"/Terms"} className="tt">terms</Link> and conditions
                                    </label>
                                </div>

                                <button className="mb-2 mt-3 col-sm-8 col-12 " type="submit">
                                    Sign up
                                </button>



                            </form>
                        </div>

                        {/* Login Form */}



                    </div>
                )}
            </div>


        </div>
    );
}

export default Register;
