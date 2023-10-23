const express = require('express');
const PORT =  3001;

const app = express();
app.use(express.json());

app.get('/api/persons', (req, res) => {
    res.json(persons);    
});


persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "445786567"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "434657587"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "345346576"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "4456785785"
    }
]

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
});