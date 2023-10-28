const axios = require('axios')

const bodyParser = require('body-parser')

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(bodyParser.json(), cors())  

app.param('id', function(req, res, next, id) {
  req.id = id;
  next();
});

// get switches
app.get('/switches',cors(), async ( req, res ) => {
    const response = await axios.get(
    `http://192.168.56.1:2150/stats/switches`
);
res.json(response.data);
});

// get links
app.get('/links',cors(), async ( req, res ) => {
            const response = await axios.get(
            `http://192.168.56.1:2150/v1.0/topology/links`
        );
        res.json(response.data);
});

app.get("/flow/:id", cors(), async (req, res) => {
  const response = await axios.get(`http://192.168.56.1:2150/stats/flow/${req.id}`);
  res.json(response.data);
});

// post flow
app.post('/addflow',cors(), async (req, res) => {
  const response = await axios.post(
    `http://192.168.56.1:2150/stats/flowentry/add`,req.body );
  });


app.listen( port, () => {
    console.log(`Listening at http://localhost:${port}`);
}); 
