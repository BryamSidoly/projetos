function mostrarSenha() {
    var passwordInput = document.getElementById("password");
    var passwordButton = document.querySelector(".password-input-container button");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordButton.textContent = "Ocultar Senha";
    } else {
      passwordInput.type = "password";
      passwordButton.textContent = "Mostrar Senha";
    }
};

// Limpar variáveis ao carregar a página
window.onload = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("idParceiros"); // Remover IDs de parceiros ao carregar a página
};

async function handleLogin(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Limpar variáveis ao iniciar o login
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("idParceiros"); // Remover IDs de parceiros ao iniciar o login

    // Endpoint de autenticação com CORS Anywhere
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var authUrl = corsProxy + "https://card.limbersoftware.com.br/api/auth";

    var dadosAutenticacao = {
        usuario: username,
        senha: password,
    };

    try {
        const response = await fetch(authUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAutenticacao),
        mode: "cors",
        timeout: 10000,
        });

        if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const idParceiros = data.parceiros.map(parceiro => parceiro.idparceiro);
        
        // Variáveis no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("idParceiros", JSON.stringify(idParceiros)); // Armazenar IDs de parceiros

        // Exibir IDs de parceiros no console
        console.log("IDs de parceiros:", idParceiros);

        window.location.href = "index.html";
        } else {
        console.error(`Falha na autenticação. Código de status: ${response.status}`);
        console.error(`Mensagem de erro: ${await response.text()}`);

        // Mensagem de usuário não encontrado
        document.getElementById("errorMessage").innerText =
            "Usuário não encontrado ou senha incorreta.";
        }
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
    }
}