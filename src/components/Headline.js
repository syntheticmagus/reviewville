import React, { useEffect, useState } from "react";
import "./Headline.css";

function Headline() {
    const [opacity, setOpacity] = useState(0);
    
    useEffect(() => {
        let opacity = 0;
        const opacityAnimation = () => {
            opacity += 0.02;
            if (opacity > 1) {
                setOpacity(1);
            } else {
                setOpacity(opacity);
                requestAnimationFrame(opacityAnimation);
            }
        };
        setTimeout(() => {
            setTimeout(opacityAnimation, 1000)
        }, 1000);
    }, []);


    return <>
        <div className="headlineContainer">
            <div className="headlineText" style={{opacity: opacity }}>
                <h1 className="headlineTitle">VAPORWEAR</h1>
                <h3 className="headlineSubtitle">A SMART WATCH YOU CAN ONLY DREAM OF</h3>
                <h3 className="headlineSubtitle">Precision luxury timepiece mastercrafted by people who have been to Switzerland.</h3>
            </div>
        </div>
    </>;
}

export default Headline;
