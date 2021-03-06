// require dependencies
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

// get /api/notes reads db.json and returns all saved notes as json
router.get('/notes', (req, res) => {
    res.json(notes);
});

// post /api/notes receive a new note to save on the request and save to db.json then return new note to client
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // if any data if invalid, send 400 error
    if (!req.body.title || !req.body.text) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = req.body;

        notes.push(note);

        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );

        res.json(notes);
    }
});

// delete /api/notes/:id to delete the selected note
router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
            
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify({ notes: notes }, null, 2)
            );

            res.json(notes)
            
            return;
        }
    }
});

// export router
module.exports = router;