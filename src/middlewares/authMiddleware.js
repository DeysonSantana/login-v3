function authMiddleware(req, res, next) {
    const { role } = req.body;
    if (!role || role !== "Administrador") {
        return res.status(403).json({ error: "Acesso negado" });
    }
    next();
}

module.exports = { authMiddleware };