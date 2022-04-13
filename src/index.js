import { VaporwearExperience } from '@syntheticmagus/vaporwear-experience';

window.AddVaporwearExperienceToDiv = function (divId) {
    const div = document.getElementById(divId);

    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.border = "0px";
    div.appendChild(canvas);

    let assetsHostUrl = "https://syntheticmagus.github.io/vaporwear-assets/";

    VaporwearExperience.CreateAsync({
        canvas: canvas, 
        assetUrlRoot: assetsHostUrl,
        assetUrlWatch: "watch.glb",
        assetUrlWatchStuds: "watch_studs.glb",
        assetUrlWatchMaterials: "watch_materials.glb",
        assetUrlEnvironmentTexture: "outdoor.env",
        assetUrlDiamondFireTexture: "diamond_fire.env",
    }).then((experience) => {
        experience.setCameraBehavior("configure");

        const buttonsDiv = document.createElement("div");
        buttonsDiv.style.display = "-webkit-flex";
        buttonsDiv.style.alignItems = "center";
        buttonsDiv.style.justifyContent = "center";
        div.appendChild(buttonsDiv);
        
        const bandButton = document.createElement("button");
        bandButton.textContent = "Band";
        bandButton.style.margin = "5px";
        const bandMaterials = [
            "band_0",
            "band_1",
            "band_2",
            "band_3",
            "band_4"
        ];
        let bandMaterialIdx = 0;
        bandButton.onclick = () => {
            bandMaterialIdx = (bandMaterialIdx + 1) % bandMaterials.length;
            experience.setBandMaterial(bandMaterials[bandMaterialIdx]);
        };
        buttonsDiv.appendChild(bandButton);
        
        const glassButton = document.createElement("button");
        glassButton.textContent = "Glass";
        glassButton.style.margin = "5px";
        const glassMaterials = [
            "glass_0",
            "glass_1",
            "glass_2",
            "glass_3",
            "glass_4"
        ];
        let glassMaterialIdx = 0;
        glassButton.onclick = () => {
            glassMaterialIdx = (glassMaterialIdx + 1) % glassMaterials.length;
            experience.setGlassMaterial(glassMaterials[glassMaterialIdx]);
        };
        buttonsDiv.appendChild(glassButton);

        const jewelryButton = document.createElement("button");
        jewelryButton.textContent = "Jewelry";
        jewelryButton.style.margin = "5px";
        let jewelryEnabled = false;
        jewelryButton.onclick = () => {
            jewelryEnabled = !jewelryEnabled;
            experience.setJewelry(jewelryEnabled ? "studs" : "none");
        };
        buttonsDiv.appendChild(jewelryButton);
        
        const gemButton = document.createElement("button");
        gemButton.textContent = "Gem";
        gemButton.style.margin = "5px";
        const gemMaterials = [
            "diamond_face",
            "ruby_face",
            "sapphire_face",
            "emerald_face"
        ];
        let gemMaterialIdx = 0;
        gemButton.onclick = () => {
            gemMaterialIdx = (gemMaterialIdx + 1) % gemMaterials.length;
            experience.setGemMaterial(gemMaterials[gemMaterialIdx]);
        };
        buttonsDiv.appendChild(gemButton);
        
        const settingButton = document.createElement("button");
        settingButton.textContent = "Setting";
        settingButton.style.margin = "5px";
        const settingMaterials = [
            "setting_gold",
            "setting_silver",
            "setting_copper",
            "setting_iron"
        ];
        let settingMaterialIdx = 0;
        settingButton.onclick = () => {
            settingMaterialIdx = (settingMaterialIdx + 1) % settingMaterials.length;
            experience.setSettingMaterial(settingMaterials[settingMaterialIdx]);
        };
        buttonsDiv.appendChild(settingButton);
    });
};
