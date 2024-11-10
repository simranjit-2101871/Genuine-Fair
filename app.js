/*console.log("the server has started");


const http = require('http');
const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.static('static'));

const hostname = '127.0.0.1';
const port = 8000;
const home = fs.readFileSync('./static/f.html')
const feedback = fs.readFileSync('./static/feedback.html')
const fair = fs.readFileSync('./static/fair.html')
const pdf = fs.readFileSync('./static/pdf.html')

const server = http.createServer((req, res)=>{
    console.log(req.url);
    url = req.url;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if(url == '/'){
        res.end(home);
    }
    else if(url == '/feedback'){
        res.end(feedback);
    }
    else if(url == '/fair'){
        res.end(fair);
    }
    else if(url == '/pdf'){
        res.end(pdf);
    }
    else{
        res.statusCode = 404;
        res.end("<h1>404 not found</h1>");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
*/






console.log("The server has started");

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const mongoose = require('mongoose');


// Middleware to parse incoming form data
//app.use(express.urlencoded({ extended: true }));\
app.use(express.urlencoded())



// getting-started.js
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/simrankart');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//DEfine mongoose schema
var feedbackSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    phone:String,
    no_need:String, 
});
var Feedback=mongoose.model('Feedback',feedbackSchema);





// Serve static files from the "static" folder
app.use(express.static('static'));



// Load HTML files
const home = fs.readFileSync(path.join(__dirname, 'static', 'f.html'));
const feedback = fs.readFileSync(path.join(__dirname, 'static', 'feedback.html'));
const fair = fs.readFileSync(path.join(__dirname, 'static', 'fair.html'));
const pdf = fs.readFileSync(path.join(__dirname, 'static', 'pdf.html'));

// Route definitions
app.get('/', (req, res) => {
    res.status(200).end(home);
});//dont use send as encoding is removed as it is downloading file instead of opening it inside the browser

app.get('/feedback', (req, res) => {
    res.status(200).end(feedback);
});

app.get('/fair', (req, res) => {
    res.status(200).end(fair);
});

app.get('/pdf', (req, res) => {
    res.status(200).end(pdf);
});

/*// 404 Route
app.use((req, res) => {
    res.status(404).end("<h1>404 Not Found</h1>");
});*///so this line written before the database coe was creating 404 erro ,now why it was doing that and removing it solved the problem



//so now writhing in the database
app.post('/', (req, res)=>{
    var myData=new Feedback(req.body);
    myData.save().then(()=>{
        res.send("This item has been saves to database");
        
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    });


})


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});




