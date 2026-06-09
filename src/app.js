const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates/views');
const partialsPath = path.join(__dirname, '..', 'templates/partials');

// Setup handlebars view engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    pageTitle: 'Weather App',
    title: 'Weather App',
    name: 'Adiel Bitudio',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    title: 'About',
    name: 'Adiel Bitudio',
    img: '/img/DSC_0430.JPG',
    alt: 'My-Profile-Picture',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help',
    title: 'Help',
    helpMessage:
      'This is some helpful text. If you have questions, contact us at support@weatherapp.com!',
    name: 'Adiel Bitudio',
  });
});

app.get('/weather', (req, res) => {
  // Check kung may address sa query string
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  // Gamitin ang geocode para makuha ang lat/long
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      // Gamitin ang result ng geocode para tawagin ang forecast
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // I-send ang final response bilang JSON
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query['search']);
  res.send({
    products: [],
  });
});

app.get('/:page/*', (req, res) => {
  const page = req.params.page;
  res.render('404', {
    pageTitle: 404,
    title: 404,
    name: 'Adiel Bitudio',
    errorMessage: `${page} article not found.`,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    pageTitle: 404,
    title: 404,
    name: 'Adiel Bitudio',
    errorMessage: 'Page not found.',
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server running: ${url} `);
});
