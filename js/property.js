const createPropriedadeSection = (propriedade) => {
    return `
            <div class="data-prod">
                <div class="data-prod-with-image">
                    <img src="" alt=""/>
                    <div class="text">
                        <h1>Propriedade</h1>
                    </div>
                </div>
                <div class="labels-data">
                    <div class="input-wrapper">
                        <label>Nome da propriedade</label>
                        <input type="text" readOnly value="${propriedade.propertyName}" />
                    </div>
                    <div class="input-wrapper">
                        <label>Localização</label>
                        <input type="text" readOnly value="${propriedade.propertyLocation}" />
                    </div>
                    <div class="input-wrapper">
                        <label>Área total da propriedade em hectares</label>
                        <input type="text" readOnly value="${propriedade.areaInHectares}" />
                    </div>
                    <div class="input-wrapper">
                        <label>Atividade realizada</label>
                        <input type="text" readOnly value="${propriedade.otherFarmAnimals}" />
                    </div>
                </div>
                <button class="btnVerAnimais" onclick="fetchAnimals('${propriedade.propertyName}')">Ver animais</button>
            </div>
        `;
};

async function fetchPropriedadeData() {
    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("token");
    const container = document.getElementById("propriedades-container");

    try {
        const response = await fetch(
            `https://ruminweb-api-repo-v1-wvlj.onrender.com/user/${userEmail}/properties`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        sessionStorage.setItem("properties", JSON.stringify(data));

        if (data.length > 0) {
            container.innerHTML = "";
            data.forEach((propriedade) => {
                container.innerHTML += createPropriedadeSection(propriedade);
            });
        } else {
            container.innerHTML =
                "<p>Nenhuma propriedade encontrada para o usuário.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar dados das propriedades: ", error);
    }
}

const fetchAnimals = (propertyName) => {
    sessionStorage.setItem("propertyName", propertyName);
    window.location.href = "../pages/animais.html";
};

window.onload = fetchPropriedadeData;