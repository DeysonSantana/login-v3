const { db } = require("../src/config/database");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE,
        senha TEXT,
        role TEXT
    )`, (err) => {
        if (err) {
            console.error("Erro ao criar a tabela:", err.message);
        } else {
            console.log("Tabela 'usuarios' verificada/criada com sucesso.");

            // Inserir usuários padrão
            const stmt = db.prepare("INSERT OR IGNORE INTO usuarios (usuario, senha, role) VALUES (?, ?, ?)");
            stmt.run("admin", "1234", "Administrador");
            stmt.run("joao", "abcd", "Usuário Padrão", (err) => {
                if (err) {
                    console.error("Erro ao inserir usuários:", err.message);
                } else {
                    console.log("Usuários iniciais adicionados com sucesso!");
                }
                stmt.finalize(() => {
                    db.close(); // Fecha o banco apenas após todas as operações serem finalizadas
                    console.log("Banco de dados fechado.");
                });
            });
        }
    });
});