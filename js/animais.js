function createAnimalSection(animal) {
    const animalImageUrl =
        animal.animalImageUrl && animal.animalImageUrl !== "null"
            ? animal.animalImageUrl
            : "https://fakeimg.pl/300x300?text=Sem+Imagem&font=bebas";

    return `
                <div class="data-rebanho"> <!-- Mantendo o estilo da página de rebanho -->
                    <div class="data-rebanho-with-image">
                        <h2>ID: ${animal.numberId} | Raça: ${animal.breed}</h2>
                        <img src="${animalImageUrl}" alt="Imagem do animal" />
                    </div>
                    <div class="text">
                        <p><strong>Peso Atual:</strong> ${animal.currentWeight}</p>
                        <p><strong>Data de Nascimento:</strong> ${animal.dateOfBirth}</p>
                        <p><strong>Peso ao Nascimento:</strong> ${animal.birthWeight}</p>
                        <p><strong>Categoria:</strong> ${animal.category}</p>
                        <p><strong>Data de Desmame:</strong> ${animal.weaningDate}</p>
                        <p><strong>Sexo:</strong> ${animal.gender}</p>
                        <p><strong>Status:</strong> ${animal.animalStatus}</p>
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
            `http://0.0.0.0:8080/user/${userEmail}/property/${propertyName}/animals`,
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