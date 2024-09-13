const admin = require('firebase-admin');


const serviceAccount = require('./path/to/serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function criarUsuario(email, senha, nome, dataNascimento) {
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: senha,
      displayName: nome,
    });
    
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      nome: nome,
      dataNascimento: dataNascimento,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Usuário criado com sucesso:', userRecord.uid);
    return userRecord.uid; 
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error; r
  }
}

const email = 'test@example.com';
const senha = 'senha123';
const nome = 'João da Silva';
const dataNascimento = '26/12/1978';

criarUsuario(email, senha, nome, dataNascimento)
  .then(uid => {
    console.log('UID do usuário criado:', uid);
  })
  .catch(error => {
    console.error('Erro ao criar usuário:', error);
  });
