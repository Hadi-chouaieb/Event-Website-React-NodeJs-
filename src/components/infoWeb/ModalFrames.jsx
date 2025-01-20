import React, { useState, useEffect } from "react";
import "./Modal.css";
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import Cookies from 'js-cookie';
import Auth from "../Auth/Auth";
import Hack from "../hackEffect/Hack";
import CTXCube from "../CTX3d/CTX3D";
import { IoEarthOutline } from "react-icons/io5";


function ModalFrames() {
    const [data, setData] = useState({});
    const [activePopup, setActivePopup] = useState(null);
    const [popupText, setPopupText] = useState("");
    const [galleryVisible, setGalleryVisible] = useState(false);
    const [Seted, SetSeted] = useState(false);
    const [show, setShow] = useState(false)

    // Typing sound effect
    const typingSound = new Audio("/audio/typer.mp3");

    // Gallery images
    const images = [
        { src: "./imgs/userFace.png", name: "---- " },
        { src: "./imgs/userFace.png", name: "---- " },
        { src: "./imgs/userFace.png", name: "---- " },
        { src: "./imgs/userFace.png", name: "---- " },
    ];

    // Content for each folder
    const popupsContent = {
        1: `About CTX:\nCTX is a premier Conference on Information Security, dedicated to equipping participants with the knowledge to defend against cyberattacks and protect devices and data from evolving digital threats. Featuring expert speakers, this event will delve into the latest challenges, strategies, and tools to enhance cybersecurity defenses. Attendees will also learn the basics of Linux and experience a real hacking operation, offering practical insights into the world of cybersecurity.`,
        
        2: `Why Attend CTX and What You’ll Gain:\nCTX offers a unique opportunity to explore cutting-edge developments in information security and engage with field experts. By attending, participants will:\n• Gain essential knowledge on defending against cyberattacks.\n• Learn how to secure devices and data against increasing threats.\n• Acquire foundational skills in Linux and execute a real-world hacking operation.\nThis event is a gateway to mastering cybersecurity fundamentals and staying ahead of digital risks.`,
        
        3: `What You’ll Learn at CTX:\n• Practical Skills: Hands-on workshops will teach real tools and techniques to secure systems and execute an ethical hacking operation.\n• Networking: Connect with industry professionals and cybersecurity experts, opening doors to valuable career opportunities.\n• Cutting-Edge Trends: Explore the latest threats, vulnerabilities, and trends in information security.\n• Foundational Linux Skills: Learn the basics of Linux, a critical tool for cybersecurity professionals.\n• Defensive Strategies: Develop the skills to protect sensitive information and systems effectively.\n\nWho Should Attend:\n• IT professionals aiming to enhance their cybersecurity expertise.\n• Students with an interest in information security and ethical hacking.\n• Anyone eager to learn how to defend against cyber threats and protect their devices.`,
        
        4: `Welcome, Mr. ${data.nom}, to CTX!\nWe are excited to have you join us for this exceptional event.\n\nParticipant Information:\n• Name: ${data.nom}\n• University: ${data.uni}\n• Email: ${data.mail}\n• Phone: ${data.Phon}\n• MTC Member: ${data.mem}\n\nAt CTX, you will:\n• Learn the fundamentals of Linux.\n• Experience a hands-on hacking operation.\n• Gain practical skills and insights to strengthen your cybersecurity knowledge.\n\nGet ready for an incredible journey into the world of information security!`,
    
        5: `MTC Contact Information:\nFor any inquiries, feel free to contact us:\n\n• Name: Microsoft Tech Club ISET Sfax\n• Phone: +216 25 951 400\n• Email: contact@mtcisetsfax.tn\n\nLocation:\nInstitut Supérieur des Études Technologiques (ISET) Sfax\nRoute de Mahdia, Km 2.5\nEl Bustan, Sfax, Tunisia\n\nWe look forward to hearing from you!`,
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("__stripedSelPower");
                if (token) {
                    const decoded = jwtDecode(token);
                    setData(decoded);

                    SetSeted(true)
                }
                else { SetSeted(false) }
            } catch (error) {
            }
        };
        fetchData();
    }, []);




    const startTypingEffect = (text) => {
        let index = 0;
        typingSound.pause();
        const typingSpeed = 40;
        setPopupText(""); 

        if (window.typingInterval) {
            clearInterval(window.typingInterval); 
            window.typingInterval = null;

        }

        // Typing effect interval
        window.typingInterval = setInterval(() => {
            setPopupText((prev) => {
                const newText = text.slice(0, prev.length + 1);
                if (newText.length > prev.length) {
                    typingSound.play();
                    typingSound.currentTime = 0; // Reset sound
                }
                if (newText.length >= text.length) {
                    clearInterval(window.typingInterval);
                                        window.typingInterval = null;
                    typingSound.pause();
                    setShow(true)

                }
                return newText;
            });

        }, typingSpeed);
    };

    const openPopup = (folderId) => {
        if (activePopup) return; 
        setActivePopup(folderId);
        startTypingEffect(popupsContent[folderId]);


    };

    // Open the register popup
    const openRegisterPopup = () => {
        setActivePopup("register");
        setPopupText(<Auth />); // Set the content to the Register component
    };

    // Close popup
    const closePopup = () => {
        setActivePopup(null);
        setPopupText("");
        if (window.typingInterval) {
            clearInterval(window.typingInterval);
            window.typingInterval = null;
        }

 
        typingSound.pause();
        typingSound.currentTime = 100;
    };

    const openImageGallery = () => {
        setGalleryVisible(true);
    };

    const closeImageGallery = () => {
        setGalleryVisible(false);
    };


    const [isDropUpVisible, setDropUpVisible] = useState(false);

    const toggleDropUp = () => {
        setDropUpVisible(!isDropUpVisible);
    };

    function powerOff() {
        const body = document.querySelector('.alll');
        const ctx = document.querySelector('#ctx');
        if (body) {
            body.classList.add('power-off');
            ctx.classList.add("CTXVISIT")

            Cookies.remove("__stripedSelPower")

            SetSeted(false)



        }
    }


    function powerOn() {
        closePopup()
        const body = document.querySelector('.alll');
        const ctx = document.querySelector('#ctx');
        if (body) {
            body.classList.remove('power-off');
            ctx.classList.remove("CTXVISIT");

        }
    }


    const highlightWords = (text, targetWords) => {
        if (!text || !targetWords || targetWords.length === 0) return text; // Handle invalid inputs

        // Create a regex for all words in the list, joining them with "|"
        const regex = new RegExp(`\\b(${targetWords.join('|')})\\b`, "gi");

        // Replace each match with a highlighted version
        return text.replace(regex, (match) => `<span style="color: red;">${match}</span>`);
    };


    return (
        <div >

            <Hack />

            <div className="slogImg"><img src="/imgs/logo.png" alt="" className="col-md-2 col-4" id="ctx" onClick={powerOn} /></div>
            
            <div className="body">


            <CTXCube />


                {/* <h1 className="title text-center">Event Dashboard</h1> */}
<div className="alll">
                <div className="container d-grid justify-content-end " onClick={() => setDropUpVisible(false)}>
                    <div className="folders"  >
                        {/* Folder 1 */}
                        <div className="folder" onClick={() => openPopup(1)}>
                            <div className="folder-icon">
                                <img src="/imgs/bank.png" alt="Folder Icon" className="IconFolder" />
                            </div>
                            <span>About CTX</span>
                        </div>

                        {/* Folder 2 */}
                        <div className="folder" onClick={() => openPopup(2)}>
                            <div className="folder-icon">
                                <img src="/imgs/ter.png" alt="Folder Icon" className="IconFolder" />
                            </div>
                            <span>Importance</span>
                        </div>

                        {/* Folder 3 */}
                        <div className="folder" onClick={() => openPopup(3)}>
                            <div className="folder-icon">
                                <img src="/imgs/bit.png" alt="Folder Icon" className="IconFolder" />
                            </div>
                            <span>Learn</span>
                        </div>

                        {/* Image Gallery */}
                        <div className="folder" onClick={openImageGallery}>
                            <div className="folder-icon">
                                <img src="/imgs/user.png" alt="Gallery Icon" className="IconFolder" />
                            </div>
                            <span>?????</span>
                        </div>

                        {/* Register Folder */}
                        {!Seted && (
                            <div className="folder" onClick={openRegisterPopup}>
                                <div className="folder-icon">
                                    <img src="/imgs/signup.png" alt="Register Icon" className="IconFolder" />
                                </div>
                                <span>Register</span>
                            </div>
                        )}


                        <div className="folder" onClick={() => openPopup(5)}>
                            <div className="folder-icon">
                                <img src="/imgs/contact.png" alt="Folder Icon" className="IconFolder" />
                            </div>
                            <span>Contact</span>
                        </div>

                        {Seted && (
                            <div className="folder" onClick={() => openPopup(4)}>
                                <div className="folder-icon">
                                    <img src="/imgs/finger.png" alt="Gallery Icon" className="IconFolder" />
                                </div>
                                <span>{data.nom ? data.nom.substring(0, 10) : ""}
                                </span>
                            </div>
                        )}
                    </div>
                </div>




                {/* Popup for folder content */}
                {activePopup && activePopup !== "register" && (
                    <div className="popup">

                        <img src="/imgs/satellite.gif" alt="" className="graph" />
                        <img src="/imgs/top-secret.png" className="secret" />


                        <div className="popup-content">
                            <span className="close" onClick={closePopup}>
                                ✖
                            </span>
                            <pre dangerouslySetInnerHTML={{ __html: highlightWords(popupText, [""]) }}></pre>

                            {/* {(show && <button onClick={closePopup} className="tempBt" >OK I'M ready !</button> )} */}

                        </div>
                    </div>
                )}

                {/* Popup for Register component */}
                {activePopup === "register" && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={closePopup}>
                                ✖
                            </span>
                            {popupText} {/* Render the Register component */}
                        </div>
                    </div>
                )}

                {/* Image Gallery */}
                {galleryVisible && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={closeImageGallery}>
                                ✖
                            </span>
                            <div className="image-gallery">
                                {images.map((image, index) => (
                                    <div className="image-container" key={index}>
                                        <img src={image.src} alt={image.name} />
                                        <div className="image-overlay">
                                            <span>{image.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <>
                    <div className="navbar-container row">

                        <span className="navbar-brand " onClick={toggleDropUp}>
                            <img
                                src="/Images/logo.png"
                                alt="Brand Logo"
                                width="105"
                                height="30"

                                className="d-inline-block align-top imgMtc"
                            />
                        </span>

                        {!Seted && (
                            <button onClick={openRegisterPopup} className="RegBT col-4 col-md-2">Register <IoEarthOutline size={25} className="earthIcon" /></button>
                        )}
                        {/* Drop-up Menu */}
                        {isDropUpVisible && (
                            <div className="dropup-menu" onClick={() => setDropUpVisible(!isDropUpVisible)}>
                                <ul className="dropup-list">
                                    {!Seted && (
                                        <li onClick={openRegisterPopup}><img src="/imgs/sign.svg" alt="" /> Register </li>
                                    )}
                                    <li onClick={powerOff}><img src="/imgs/power.svg" alt="" /> Power off CTX </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            </div>


            </div> 
        </div>
    );
}

export default ModalFrames;
