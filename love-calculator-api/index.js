const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());

app.get('/api/perfectmatch/:personone/:persontwo', (req, res) => {
    try {
        const lcc = require("./loveCalculatorLogic");
        const inputParser = require("./inputParser");
        const DataException = require("./exception");
        const nameOfFirstPerson = req.params.personone.toUpperCase();
        const nameOfSecondPerson = req.params.persontwo.toUpperCase();

        if (inputParser.isCorruptStr(nameOfFirstPerson) || inputParser.isCorruptStr(nameOfSecondPerson)){
            throw new DataException(`Person name can only contain letters. Letters and numbers are not allowed. Please try again.`);
        }

        let result = lcc.loveComparisonCalculator(nameOfFirstPerson, nameOfSecondPerson);

        res.status(200).send({result});
    } catch (DataException) {
        res.status(400).send(DataException.message);
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})