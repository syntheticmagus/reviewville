import { VaporwearExperience } from "@syntheticmagus/vaporwear-experience";
import React, { useState, useEffect } from "react";
import "./BabylonExperience.css";

function ConfigurationOptionChoice(props) {
    return (
        <div className="configurationChoice" onClick={ props.onClick }>
            { props.choiceName && <h4 className="configurationName">{ props.choiceName }</h4> }
            { props.imageName && <img src={ props.imageName } className="configurationImage" /> }
        </div>
    );
}

function Configurator(props) {
    return (
        <div className="configuratorList"> { props.children } </div>
    );
}

function ConfigurationOption(props) {
    return (
        <div style={{ display: props.isHidden ? "none" : "-webkit-flex", alignItems: "center", justifyContent: "center" }}>
            <div className="configurationOption" onClick={ () => { props.onSelected(props.selectionName === props.optionName ? "none" : props.optionName) } }>
                <h4 className="configurationOptionLink">
                    { props.optionName }
                </h4>
            </div>
            <div className="configurationOptionChoiceList" style={{ visibility: props.selectionName === props.optionName ? "visible" : "hidden" }}>
                { props.children }
            </div>
        </div>
    );
}

const CANVAS_NAME = "babylonExperienceCanvas";

let experience;
function BabylonExperience() {
    const [selected, setSelected] = useState("none");
    const [studs, setStuds] = useState(false);

    const [hotspot0X, setHotspot0X] = useState(0);
    const [hotspot0Y, setHotspot0Y] = useState(0);
    const [hotspot0Alpha, setHotspot0Alpha] = useState(0);

    const [hotspot1X, setHotspot1X] = useState(0);
    const [hotspot1Y, setHotspot1Y] = useState(0);
    const [hotspot1Alpha, setHotspot1Alpha] = useState(0);

    const [hotspot2X, setHotspot2X] = useState(0);
    const [hotspot2Y, setHotspot2Y] = useState(0);
    const [hotspot2Alpha, setHotspot2Alpha] = useState(0);

    const [configurationOptionsOpacity, setConfigurationOptionsOpacity] = useState(0);

    useEffect(() => {
        const states = ["overall", "clasp", "face", "levitate", "configure"];
        let currentState = 0;
        
        const canvas = document.getElementsByClassName(CANVAS_NAME)[0];

        if (!experience) {
            VaporwearExperience.CreateAsync({
                canvas: canvas, 
                assetUrlRoot: "./",
                assetUrlWatch: "watch.glb",
                assetUrlWatchStuds: "watch_studs.glb",
                assetUrlWatchMaterials: "watch_materials.glb",
                assetUrlEnvironmentTexture: "studio.env",
                assetUrlDiamondFireTexture: "diamond_fire.env",
            }).then((result) => {
                experience = result;
                experience.disableMouseWheel();

                experience.addEventListener("hotspotUpdate", (hotspotUpdate) => {
                    if (hotspotUpdate.hotspotId === 0) {
                        setHotspot0X(hotspotUpdate.x);
                        setHotspot0Y(hotspotUpdate.y);
                        setHotspot0Alpha(hotspotUpdate.visible ? 1 : 0);
                    } else if (hotspotUpdate.hotspotId === 1) {
                        setHotspot1X(hotspotUpdate.x);
                        setHotspot1Y(hotspotUpdate.y);
                        setHotspot1Alpha(hotspotUpdate.visible ? 1 : 0);
                    } else if (hotspotUpdate.hotspotId === 2) {
                        setHotspot2X(hotspotUpdate.x);
                        setHotspot2Y(hotspotUpdate.y);
                        setHotspot2Alpha(hotspotUpdate.visible ? 1 : 0);
                    }
                });

                experience.addEventListener("configurationOptionsLoaded", () => {
                    let opacity = 0;
                    const opacityAnimation = () => {
                        if (opacity < 1) {
                            opacity += 0.05;
                            setConfigurationOptionsOpacity(opacity);
                            setTimeout(opacityAnimation, 30);
                        } else {
                            setConfigurationOptionsOpacity(1);
                        }
                    }
                    opacityAnimation();
                });
                
                const scrollHandler = function () {
                    // https://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
                    const maxScroll = Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight, 
                        document.documentElement.clientHeight,
                        document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight);
                    
                    const scroll = window.scrollY / maxScroll;
                    const newState = Math.round(scroll * states.length);
                    if (newState != currentState)
                    {
                        currentState = newState;
                        setSelected("none");
                        experience.setCameraBehavior(states[currentState]);

                        setHotspot0Alpha(0);
                        setHotspot1Alpha(0);
                        setHotspot2Alpha(0);
                    }
                };
                window.addEventListener("scroll", scrollHandler);
                scrollHandler();
            });
        }
    }, []);

    return <>
        <canvas className={CANVAS_NAME} />
        <div className="hotspot" style={{ left: hotspot0X - 15, top: hotspot0Y - 15, opacity: hotspot0Alpha, background: "#EEEEEEAA" }} >
            <h4 className="hotspotText">Rare earth magnets</h4>
        </div>
        <div className="hotspot" style={{ left: hotspot1X - 15, top: hotspot1Y - 15, opacity: hotspot1Alpha, background: "#EEEEEEAA" }} >
            <h4 className="hotspotText">Minimal geometry</h4>
        </div>
        <div className="hotspot" style={{ left: hotspot2X - 15, top: hotspot2Y - 15, opacity: hotspot2Alpha, background: "#EEEEEEAA" }} >
            <h4 className="hotspotText">Allan please add details</h4>
        </div>
        <div className="vaporwearExperienceUI" style={{ opacity: configurationOptionsOpacity }}>
            <Configurator>
                <ConfigurationOption optionName="Band" selectionName={ selected } onSelected={ setSelected }>
                    <ConfigurationOptionChoice imageName="./band_0.png" onClick={ () => { experience.setBandMaterial("band_0"); } } />
                    <ConfigurationOptionChoice imageName="./band_1.png" onClick={ () => { experience.setBandMaterial("band_1"); } } />
                    <ConfigurationOptionChoice imageName="./band_2.png" onClick={ () => { experience.setBandMaterial("band_2"); } } />
                    <ConfigurationOptionChoice imageName="./band_3.png" onClick={ () => { experience.setBandMaterial("band_3"); } } />
                    <ConfigurationOptionChoice imageName="./band_4.png" onClick={ () => { experience.setBandMaterial("band_4"); } } />
                </ConfigurationOption>

                <ConfigurationOption optionName="Glass" selectionName={ selected } onSelected={ setSelected }>
                    <ConfigurationOptionChoice imageName="./glass_0.png" onClick={ () => { experience.setGlassMaterial("glass_0"); } } />
                    <ConfigurationOptionChoice imageName="./glass_1.png" onClick={ () => { experience.setGlassMaterial("glass_1"); } } />
                    <ConfigurationOptionChoice imageName="./glass_2.png" onClick={ () => { experience.setGlassMaterial("glass_2"); } } />
                    <ConfigurationOptionChoice imageName="./glass_3.png" onClick={ () => { experience.setGlassMaterial("glass_3"); } } />
                    <ConfigurationOptionChoice imageName="./glass_4.png" onClick={ () => { experience.setGlassMaterial("glass_4"); } } />
                </ConfigurationOption>

                <ConfigurationOption optionName="Jewelry" selectionName={ selected } onSelected={ (selected) => { 
                    setSelected(selected);
                    experience.setJewelry(!studs ? "studs" : "none");
                    setStuds(!studs);
                } } />

                <ConfigurationOption optionName="Gem" isHidden={!studs} selectionName={ selected } onSelected={ setSelected }>
                    <ConfigurationOptionChoice imageName="./gem_0.png" onClick={ () => { experience.setGemMaterial("diamond_face"); } } />
                    <ConfigurationOptionChoice imageName="./gem_1.png" onClick={ () => { experience.setGemMaterial("emerald_face"); } } />
                    <ConfigurationOptionChoice imageName="./gem_2.png" onClick={ () => { experience.setGemMaterial("sapphire_face"); } } />
                    <ConfigurationOptionChoice imageName="./gem_3.png" onClick={ () => { experience.setGemMaterial("ruby_face"); } } />
                </ConfigurationOption>

                <ConfigurationOption optionName="Setting" isHidden={!studs} selectionName={ selected } onSelected={ setSelected }>
                    <ConfigurationOptionChoice imageName="./setting_0.png" onClick={ () => { experience.setSettingMaterial("setting_gold"); } } />
                    <ConfigurationOptionChoice imageName="./setting_1.png" onClick={ () => { experience.setSettingMaterial("setting_silver"); } } />
                    <ConfigurationOptionChoice imageName="./setting_2.png" onClick={ () => { experience.setSettingMaterial("setting_copper"); } } />
                    <ConfigurationOptionChoice imageName="./setting_3.png" onClick={ () => { experience.setSettingMaterial("setting_iron"); } } />
                </ConfigurationOption>

                <ConfigurationOption optionName="Zoom" selectionName={ selected } onSelected={ setSelected }>
                    <ConfigurationOptionChoice choiceName="Min" onClick={ () => { experience.setZoom(1); } } />
                    <ConfigurationOptionChoice choiceName="25%" onClick={ () => { experience.setZoom(0.75); } } />
                    <ConfigurationOptionChoice choiceName="50%" onClick={ () => { experience.setZoom(0.5); } } />
                    <ConfigurationOptionChoice choiceName="75%" onClick={ () => { experience.setZoom(0.25); } } />
                    <ConfigurationOptionChoice choiceName="Max" onClick={ () => { experience.setZoom(0); } } />
                </ConfigurationOption>
            </Configurator>
        </div>
    </>
};

export default BabylonExperience;
