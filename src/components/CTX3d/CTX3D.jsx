import React from "react";
import "./CTXCube.css";
import Hack from "../hackEffect/Hack";

function CTXCube() {
    return (
        <div class="CTX">
            <div class="cube">
                <div class="face top"><img src="/imgs/CTX.png"/> </div>
                <div class="face bottom"><img src="/imgs/CTX.png"/></div>
                <div class="face left"><img src="/imgs/CTX.png"/></div>
                <div class="face right"><img src="/imgs/CTX.png"/></div>
                <div class="face front"><img src="/imgs/CTX.png"/></div>
                <div class="face back"><img src="/imgs/CTX.png"/></div>
                <img src="/imgs/mtcLogo.png" alt="Center Image" class="cube-center-img" />
            </div>

        </div>
    );
}

export default CTXCube;
