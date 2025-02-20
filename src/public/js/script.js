async function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, senha })
    });

    if (!response.ok) {
        document.getElementById("mensagem").textContent = "Erro ao fazer login";
        return;
    }

    try {
        const data = await response.json();
        document.getElementById("mensagem").textContent = data.message;
    } catch (error) {
        console.error("Erro ao processar JSON:", error);
        document.getElementById("mensagem").textContent = "Erro inesperado";
    }
}
