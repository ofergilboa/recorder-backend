const express = require('express')
const app = express()
const api = require(`./server/routes/api`)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/ToDoList`, {useNewUrlParser: true})
app.use(express.static(path.join(__dirname, 'build')));

// ===== not secure ====== allowing  free acsses
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

   next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ===== no need with React (!?) 
// app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(`/`, api)


app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8181
app.listen(port, ()=>console.log('Server running on port '+ port))