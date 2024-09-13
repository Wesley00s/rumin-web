document.addEventListener('DOMContentLoaded', () => {
    const userEmail = sessionStorage.getItem('userEmail');
    async function fetchPropriedadeData() {
        try {
            const response = await fetch('http://0.0.0.0:8080/user/' + userEmail);
            const data = await response.json();
            console.log(data);

            const firstName = data.firstName;
            const lastName = data.lastName;
            document.getElementById('fullName').value = firstName + ' ' + lastName;
            document.getElementById('email').value = data.email;
            document.getElementById('occupation').value = data.occupation;
            document.getElementById('dateOfBirth').value = data.dateOfBirth;

        } catch (error) {
            console.error("Erro ao buscar os dados: ", error);
        }
    }

    fetchPropriedadeData();
});