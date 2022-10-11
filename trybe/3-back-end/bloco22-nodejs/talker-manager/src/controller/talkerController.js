const fs = require('fs').promises;
const crypto = require('crypto');
const path = require('path');

const jsonPath = path.join(__dirname, '../talker.json');

const readFile = () => fs.readFile(jsonPath, 'utf8')
.then((data) => JSON.parse(data));

const authCheck = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Token não encontrado' });
    if (String(auth).length !== 16) return res.status(401).json({ message: 'Token inválido' }); 
    next();
};

const all = (req, res) => readFile()
        .then((talkers) => res.status(200).json(talkers))
        .catch((err) => res.status(500).json({ error: err.message }));

const getTalkerById = (req, res) => readFile()
        .then((talkers) => {
            const talker = talkers.find((t) => t.id === Number(req.params.id));
            if (talker) {
                return res.status(200).json(talker);  
            } 
                return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
            });

const emailValidation = (req, res, next) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // source https://regexr.com/3e48o          
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!(regex.test(email))) {
 return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
} 
    next();
    };

const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (String(password).length < 6) {
 return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}        
    next();
};

const generateLoginToken = (req, res) => {
    const token = crypto.randomBytes(8).toString('hex'); // Generates login token, src: stackoverflow.com/questions/57369426/node-crypto-randombytes-return-token-from-function
    return res.status(200).json({ token });
};

// separated validation check because lint asked for it :) now it is surely easier to read.
const validateNameAge = (req, res, next) => {
    const talker = req.body;
    const { name, age } = talker;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
 return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (Number(age) < 18) {
 return res.status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
    next();
    };

const validateDate = (req, res, next) => {
    const talker = req.body;
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // src: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if (!talker.talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    if (!talker.talk.watchedAt) {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' }); 
}
    if (!dateRegex
        .test(talker.talk.watchedAt)) {
 return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
    next();
    };

const validateRate = (req, res, next) => {
    const talker = req.body.talk;
    if (!talker.rate && talker.rate !== 0) {
 return res.status(400)
    .json({ message: 'O campo "rate" é obrigatório' }); 
}
    const rate = Number(talker.rate);
    if (rate < 1 || rate > 5) {
        return res.status(400)
           .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
       }
    next();
    };

const addTalker = async (req, res) => {
    let talker = req.body;
    const talkers = await readFile();
    // generate next id, create talker obj with id, and push it to talkers array and rewrite it into the talker.json file
    const id = talkers.reduce((prev, at) => (prev.id > at.id ? prev.id : at.id), 0) + 1;
    talker = { id, ...talker };
    talkers.push(talker);
    return fs.writeFile(jsonPath, JSON.stringify(talkers))
    .then(() => res.status(201).json(talker));
};

const updateTalker = async (req, res) => { // no space in lint for try / catch, refactor it later
    const updatedTalker = req.body;
    const id = Number(req.params.id);
    const talkers = await readFile();
    const talker = talkers.find((t) => t.id === id); // find talker id
    if (!talker) { 
        return res.status(401).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    const newTalkers = talkers.filter((t) => t.id !== talker.id); // remove old talker
    const newTalker = { id, ...updatedTalker };
    newTalkers.push(newTalker); // add updated talker
    return fs.writeFile(jsonPath, JSON.stringify(newTalkers))
        .then(() => res.status(200).json(newTalker))
        .catch((err) => res.status(500).json({ error: err.message }));
};

const deleteTalkerById = async (req, res) => {
    const talkerId = Number(req.params.id);
    try {
        const talkers = await readFile();
        const newTalkers = talkers.filter((t) => t.id !== talkerId);
        return fs.writeFile(jsonPath, JSON.stringify(newTalkers))
            .then(() => res.status(204).end());
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getTalkerByQuery = async (req, res) => {
    const { q } = req.query;
    try {
        const talkers = await readFile();
        const talker = talkers.filter((t) => t.name.includes(q));
        return res.status(200).json(talker);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { all, 
    getTalkerById, 
    generateLoginToken, 
    addTalker, 
    updateTalker, 
    deleteTalkerById, 
    getTalkerByQuery,
    authCheck,
    emailValidation,
    passwordValidation,
    validateNameAge,
    validateDate,
    validateRate };
