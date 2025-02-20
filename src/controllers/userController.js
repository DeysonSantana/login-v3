const { db } = require("../config/database");

function getUsers(req, res) {
    db.all("SELECT id, usuario, role FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar usuários" });
        res.json(rows);
    });
}

function createUser(req, res) {
    const { usuario, senha, role } = req.body;
    db.run("INSERT INTO usuarios (usuario, senha, role) VALUES (?, ?, ?)", [usuario, senha, role], function(err) {
        if (err) return res.status(500).json({ error: "Erro ao criar usuário" });
        res.json({ message: "Usuário criado com sucesso", id: this.lastID });
    });
}

module.exports = { getUsers, createUser };