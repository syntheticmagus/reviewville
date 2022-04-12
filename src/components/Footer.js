import React, { useEffect, useState } from "react";
import "./Footer.css";

function Footer() {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            // https://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
            const maxScroll = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight, 
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight);
            setOpacity(Math.max(1 - (maxScroll - window.innerHeight - window.scrollY) / 300, 0));
        });
    });

    return <>
        <div className="footerBar" style={{opacity: opacity}}>
            <img src="./vaporwear_logo.png" className="footerLogo" />
            <p className="footerCopyright">COPYRIGHT LOLOLOL</p>
        </div>
    </>;
}

export default Footer;
