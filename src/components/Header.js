import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setOpacity(Math.max(1 - window.scrollY / 300, 0));
        });
    });

    return <>
        <nav>
            <div className="headerBar" style={{opacity: opacity}}>
                <img src="./vaporwear_logo.png" className="headerLogo" />
            </div>
        </nav>
    </>;
}

export default Header;
