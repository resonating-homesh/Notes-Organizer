const express = require('express');
const router = express.Router();
const fetchuser = require('../middleWare/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Routes1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

})

//Routes1: Add a new note, login req.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array })
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }

    })

//Route 3: Update an existing note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //create new note
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find  the note to be updated
            let note = await Notes.findById(req.params.id);
            if (!note) { res.status(404).send("Not found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }

    })

    //Route 3: delete an existing note
    router.delete('/deletenote/:id', fetchuser,
        async (req, res) => {
            try {
                const { title, description, tag } = req.body;
    
                //find  the note to be updated
                let note = await Notes.findById(req.params.id);
                if (!note) { res.status(404).send("Not found") }
                //allow deletion only if user owns
                if (note.user.toString() !== req.user.id) {
                    return res.status(401).send("Not Allowed");
                }
    
                note = await Notes.findByIdAndDelete(req.params.id)
                res.json({ "Success": "note has been deleted", note: note })
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal error occured");
            }
    
        })
    

module.exports = router