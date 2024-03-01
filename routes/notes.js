const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    const dbData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(dbData);
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    const newObj = {
        title, text, id: uuidv4()
    }

    db.push(newObj);
    fs.writeFileSync('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json('note has been created');
});

router.delete('/notes/:id',  (req, res) => {


    const newDb = db.filter((note) => note.id !== req.params.id);
 
 fs.writeFileSync('./db/db.json', JSON.stringify(newDb), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json('note has been deleted');
})


module.exports = router;