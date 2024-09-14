
const btnLogout = document.querySelector('.logout');

btnLogout.addEventListener('click', () => {
    console.log('Logout clicked');
    sessionStorage.clear()
})