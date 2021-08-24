const express = require("express");
const router = express.Router();
const viaCepService = require("./services/viaCep");

router.get("/cep", async (req, res) => {
    const cep = req.query.cep;
    const response = await viaCepService.find(cep);
    return res.json(response);
});

module.exports = router;
