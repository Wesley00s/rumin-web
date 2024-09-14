const createAnimalSection = (animal) => {
    const animalImageUrl =
        animal.animalImageUrl && animal.animalImageUrl !== "null"
            ? animal.animalImageUrl
            : "https://fakeimg.pl/300x300?text=Sem+Imagem&font=bebas";

    let currentWeight = animal.currentWeight !== null ? animal.currentWeight : "N/A";
    let dateOfBirth = animal.dateOfBirth !== null ? animal.dateOfBirth : "N/A";
    let birthWeight = animal.birthWeight !== null ? animal.birthWeight : "N/A";
    let category = animal.category !== null ? animal.category : "N/A";
    let weaningDate = animal.weaningDate !== "null"? animal.weaningDate : "N/A";
    let gender = animal.gender !== null ? animal.gender : "N/A";
    let animalStatus = animal.animalStatus !== null ? animal.animalStatus : "N/A";

    const statusColor = animalStatus.toLowerCase() === "ativo" ? "green" : "red";

    return `
        <div class="data-rebanho"> <!-- Mantendo o estilo da página de rebanho -->
            <div class="data-rebanho-with-image">
                <h2>ID: ${animal.numberId} | Raça: ${animal.breed}</h2>
                <img src="${animalImageUrl}" alt="Imagem do animal" />
            </div>
            <div class="text">
                <p><strong>Peso Atual:</strong> ${currentWeight}</p>
                <p><strong>Data de Nascimento:</strong> ${dateOfBirth}</p>
                <p><strong>Peso ao Nascimento:</strong> ${birthWeight}</p>
                <p><strong>Categoria:</strong> ${category}</p>
                <p><strong>Data de Desmame:</strong> ${weaningDate}</p>
                <div class="field">
                    <p><strong>Sexo:</strong> ${gender}</p>
                    <p><span class="status-indicator" style="background-color: ${statusColor};"></span> ${animalStatus}</p>
        
                </div>
             </div>
        </div>
    `;
}


async function fetchAnimalsData() {
    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("token");
    const propertyName = sessionStorage.getItem("propertyName");

    try {
        const response = await fetch(
            `https://ruminweb-api-repo-v1-wvlj.onrender.com/user/${userEmail}/property/${propertyName}/animals`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const animals = await response.json();
        const container = document.getElementById("rebanho-container");

        if (animals.length > 0) {
            container.innerHTML = "";
            animals.forEach((animal) => {
                container.innerHTML += createAnimalSection(animal);
            });
        } else {
            container.innerHTML =
                "<p>Nenhum animal encontrado para esta propriedade.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar dados dos animais: ", error);
        container.innerHTML =
            "<p>Erro ao carregar informações dos animais.</p>";
    }
}

window.onload = fetchAnimalsData;