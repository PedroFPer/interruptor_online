import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyBWKZR64wHisHvc5h0y6XDzq6EjuJ4Rbf0",
        authDomain: "interruptoronline.firebaseapp.com",
        databaseURL: "https://interruptoronline-default-rtdb.firebaseio.com",
        projectId: "interruptoronline",
        storageBucket: "interruptoronline.appspot.com",
        messagingSenderId: "1033486886017",
        appId: "1:1033486886017:web:1b690601f57d4443c41980",
        measurementId: "G-WC3X1DKTF6"
    };


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ledRef = ref(db, "led/estado");

async function alternarLED() {
    try {
        const snapshot = await get(ledRef);
        if (snapshot.exists()) {
            const estadoAtual = snapshot.val(); 
            const novoEstado = estadoAtual === 0 ? 1 : 0; 

            await set(ledRef, novoEstado);

            const imgBotao = document.getElementById("imgBotao");
            if (novoEstado === 1) {
                imgBotao.src = "imagem/botao_ligado.png";
                imgBotao.alt = "Botão Ligado";
            } else {
                imgBotao.src = "imagem/botao_desligado.png";
                imgBotao.alt = "Botão Desligado";
            }
        } else {
            alert("Erro: O nó 'led/estado' não existe!");
        }
    } catch (error) {
        console.error("Erro ao atualizar o estado do LED:", error);
    }
}


document.getElementById("meuBotao").addEventListener("click", alternarLED);

async function inicializarBotao() {
    try {
        const snapshot = await get(ledRef);
        if (snapshot.exists()) {
            const estadoAtual = snapshot.val();
            const imgBotao = document.getElementById("imgBotao");
            if (estadoAtual === 1) {
                imgBotao.src = "imagem/botao_ligado.png";
                imgBotao.alt = "Botão Ligado";
            } else {
                imgBotao.src = "imagem/botao_desligado.png";
                imgBotao.alt = "Botão Desligado";
            }
        } else {
            console.warn("O nó 'led/estado' não existe!");
        }
    } catch (error) {
        console.error("Erro ao obter o estado inicial do LED:", error);
    }
}

window.addEventListener("load", inicializarBotao);
