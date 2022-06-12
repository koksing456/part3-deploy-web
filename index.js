const http = require("http");
const express = require("express");
const app = express();

app.use(express.json())
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is asdasdasdas",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((x) => x.id === id);
  if (!note) {
    return res.status(404).send(`note ${id} is not exist`);
  }

  res.send(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  
  notes = notes.filter(x => x.id !== id)

  res.status(204).end()
});

app.post("/api/notes", (req, res) => {

  let note = {
    id: notes.length + 1,
    content: req.body.content,
    date: req.body.date,
    important: req.body.important,
  }

  notes.push(note)

  res.send(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
