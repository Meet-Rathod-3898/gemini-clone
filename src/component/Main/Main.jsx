import React, { useContext } from 'react';
import { Context } from '../../context/context';
import { assets } from '../../assets/assets/assets';
import './Main.css';

const Main = ({ setExtended }) => {
    const { 
        onSent, 
        recentPrompt, 
        showResult, 
        loading, 
        resultData, 
        input, 
        setInput 
    } = useContext(Context);

    const handleSend = () => {
        if (input.trim()) {
            onSent();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                        onClick={() => setExtended(prev => !prev)} 
                        className="mobile-menu-icon" 
                        src={assets.menu_icon} 
                        alt="Menu" 
                    />
                    <p>Gemini</p>
                </div>
                <img src={assets.user_icon} alt="User" />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")} className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Briefly summarize this concept: urban planning")} className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Brainstorm team bonding activities for our work retreat")} className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Tell me about React js and React native")} className="card">
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? (
                                <img 
                                    onClick={handleSend} 
                                    src={assets.send_icon} 
                                    alt="Send" 
                                    style={{ cursor: "pointer" }}
                                />
                            ) : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;