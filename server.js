const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log',log + '\n',(error) => {
      if(error){console.log('Unable to ');}
  })
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

///maintainance mode
// app.use((req,res) => {
//   return res.render('maintainance.hbs')
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hey My friends, welcome to my new web page',
})
  // res.send('Root Page');
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
})
  // res.send('about page');
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle:'Projects'
})
})

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to get the Page'
  });
});

app.listen(port,() => {
  console.log(`starting the web on port : ${port}`);
});
