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
app.get('/api/rpitems/:id', (req, res) => res.json(sports[req.params.id]));
// add new item
app.post('/api/rpitems', (req, res) => {
    sports.push(req.body.sportName);
    return res.json(req.body);
});
// update item by id
app.put('/api/rpitems/:id', (req, res) => {
    sports[req.params.id] = req.body.sportName;
    return res.json(sports);
});
// remove item by id
app.delete('/api/rpitems/:id', (req, res) => {
    sports.splice(req.params.id, 1);
    return res.json(sports);
});


const server = app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}`);
});