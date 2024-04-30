import React from "react";
import './siteDoesntExist.css';
import { useState } from "react"
import LogInForm from "./login"
import { useNavigate } from "react-router-dom";


export default function SiteDoesntExist({setLoggedIn}) {
    // const {setExist} = props;
    const[showLoginForm,setShowLoginForm] = useState(false);

    function handleLoginClick(){
        setShowLoginForm(true);
        // setLoggedIn(true);
        // localStorage.setItem('isLoggedIn', 'true');
    };

    return (
        !showLoginForm ? 
            <div className="container">
                <div className="content">
                     <h1>Welcome to Your Site</h1>
                     <p className="welcome-message">Hello Manager,</p>
                     <p className="welcome-message">Your site is currently under construction.</p>
                     <p className="welcome-message">We're working hard to bring it to life.</p>
                     <p className="welcome-message">Please login to start building it.</p>
                     <button onClick={handleLoginClick} className="login-link">Login</button>

                 </div>
                 

            </div>
        : <LogInForm setLoggedIn={setLoggedIn}/>
    );

}