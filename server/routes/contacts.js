const express = require('express');
const db = require('../db');

const router = express.Router();

// ROUTE 1: /api/contacts/fetchall
router.post('/fetchall', async (req, res) => {
    const { sortAsc } = req.body;
    const { data, error } = await db
    .from('contacts')
    .select('id, first_name, last_name, phone_number, email, company, job_title')
    .order('first_name', { ascending: sortAsc});

    if (error) {
        console.error("Error adding contact:", error);
        res.status(400).send("Error fetching contacts");
    } else {
        console.log(data);
        res.status(200).json(data);
    }
});

// ROUTE 2: /api/contacts/addcontact
router.post('/addcontact', async (req, res) => {
    console.log(req.body); //testing
    const { firstName, lastName, email, phoneNo, company, title } = req.body;

    const { phoneno, phoneError } = await db
    .from('contacts')
    .select('phone_number');

    console.log(phoneno); //testing

    const { data, error } = await db
    .from('contacts')
    .insert({first_name: firstName, last_name: lastName, email: email, phone_number: phoneNo, company: company, job_title: title});

    if (error) {
        console.error("Error adding contact:", error);
        res.status(400).send("Error adding contact");
    } else {
        console.log("Contact added successfully");
        res.status(201).send("Contact added successfully!");
    }
});

// ROUTE 3: /api/contacts/editcontact/:id
router.put('/editcontact/:id', async (req, res) => {
    console.log(req.body); //testing
    console.log("EDIT CONTACT"); //testing
    const { id } = req.params;

    const { firstName, lastName, email, phoneNo, company, title } = req.body;

    const { error } = await db
    .from('contacts')
    .update({first_name: firstName,
            last_name: lastName,
            email: email, 
            phone_number: phoneNo, 
            company: company, 
            job_title: title})
    .eq('id', id);

    if (error) {
        console.error("Error Editing contact:", error);
        res.status(400).send("Error Editing contact");
    } else {
        console.log("Contact Edited successfully");
        res.status(200).send("Contact Edited successfully!");
    }
});


// ROUTE 4: /api/contacts/deletecontact/:phoneno
router.delete('/deletecontact/:phoneno', async (req, res) => {
    const { phoneno } = req.params;

    const { data, error } = await db
    .from('contacts')
    .delete()
    .eq('phone_number', phoneno);

    if (error) {
        console.error("Error adding contact:", error);
        res.status(400).send("Error deleting contact!");
    } else {
        console.log("Contact Deleted Successfully");
        res.status(201).send("Contact Deleted Successfully!");
    }
});



module.exports = router;