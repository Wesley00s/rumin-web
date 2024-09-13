async function fetchAnimals() {
    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("token");

    try {
        const response = await fetch(
            `http://0.0.0.0:8080/user/${userEmail}/animals`,
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
            container.innerHTML = animals
                .map((animal) => {

                    const animalImageUrl =
                        animal.animalImageUrl && animal.animalImageUrl !== "null"
                            ? animal.animalImageUrl
                            : "https://fakeimg.pl/300x300?text=Sem+Imagem&font=bebas";

                    return `
                    <div class="animal-section">
                        <h2>${animal.numberId} - ${animal.breed}</h2>
                        <img src="${animalImageUrl}" alt="Imagem do animal"/>
                        <p><strong>Peso Atual:</strong> ${animal.currentWeight}</p>
                        <p><strong>Data de Nascimento:</strong> ${animal.dateOfBirth}</p>
                        <p><strong>Peso ao Nascimento:</strong> ${animal.birthWeight}</p>
                        <p><strong>Categoria:</strong> ${animal.category}</p>
                        <p><strong>Data de Desmame:</strong> ${animal.weaningDate}</p>
                        <p><strong>Sexo:</strong> ${animal.gender}</p>
                        <p><strong>Status:</strong> ${animal.animalStatus}</p>
                    </div>
                `;
                })
                .join("");
        } else {
            container.innerHTML = "<p>Nenhum animal encontrado.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar dados dos animais: ", error);
        document.getElementById("rebanho-container").innerHTML =
            "<p>Erro ao carregar informações dos animais.</p>";
    }
}

window.onload = fetchAnimals;