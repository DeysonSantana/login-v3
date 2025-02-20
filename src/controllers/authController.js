const { db } = require("../config/database");

function login(req, res) {
    const { usuario, senha } = req.body;
    db.get("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha], (err, user) => {
        if (err) return res.status(500).json({ error: "Erro no servidor" });
        if (!user) return res.status(401).json({ error: "Credenciais inválidas" });
        res.json({ message: "Login bem-sucedido", role: user.role });
    });
}

module.exports = { login };