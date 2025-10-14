import express from "express";

const PORT = 8080;;

const app = express();
app.use(express.json());

let sports = ['Soccer', 'Handball', 'Volleyball', 'Cricket', 'Swimming'];

// Server running
app.get('/', (req, res) => res.json({message: 'express server running'}));

// get all items
app.get('/api/rpitems', (req, res) => res.json(sports));

// get item by id
app.get('/api/rpitems/:id', (req, res) => {
    try {
        if (req.params.id > sports.length) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        return res.json({"sportName": sports[req.params.id]});

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// add new item
app.post('/api/rpitems', (req, res) => {
    try {
        
        if (!req.body.sportName) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        
        sports.push(req.body.sportName);
        return res.json(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// update item by id
app.put('/api/rpitems/:id', (req, res) => {
    try {

        if (req.params.id > sports.length) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        sports[req.params.id] = req.body.sportName;
        return res.json(sports);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// remove item by id
app.delete('/api/rpitems/:id', (req, res) => {
    try {

        if (req.params.id > sports.length) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        sports.splice(req.params.id, 1);
        return res.json(sports);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


const server = app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}`);
});