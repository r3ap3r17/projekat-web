const express = require('express');
const router = express.Router();
const Model = require('../model/model');

// POST
router.post('/post', async (req, res) => {
    const data = new Model({
        index: req.body.index,
        name: req.body.name,
        surname: req.body.surname
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        console.log("[+] Data submited !");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("[+] Data was not submited !");
    }
});

// GET / GET-ALL
router.get('/get-all', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("[+] Data cant be retrieved !");
    }
});
router.get('/get/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("[+] Data cant be retrieved !");
    }
});

// PATCH
router.patch('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateData = req.body;

        const result = await Model.findByIdAndUpdate(id, updateData, { new: true });
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("[+] Data cant be updated !");
    }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Student sa indexom ${data.index} je obrisan`);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("[+] Data cant be deleted !");
    }
});




module.exports = router;