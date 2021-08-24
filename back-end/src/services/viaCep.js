const axios = require("axios");

async function find(cep) {
    try {
        const { data } = await axios(`https://viacep.com.br/ws/${cep}/json/`);
        return data;
    }
    catch (e) {
        return { status: 400, e };
    }
}

module.exports = { find };