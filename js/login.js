import { auth, signInWithEmailAndPassword } from './firebaseConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn_entrar').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '../pages/profile.html';
            sessionStorage.setItem("userEmail", userCredential.user.email)
            alert("Login realizado com sucesso!");
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            alert('Email ou senha inválidos!');
        }
    });
});
