// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// FUNCTIONS:

// conver to UTC -> Return string Mon, 10 Jan 2022 00:00:00 GMT
const convertToUTC = (dateFormat) => {
  return new Date(dateFormat).toUTCString()
}

// convert to UNIX -> Return string 1641772800000
const convertToUNIX = (dateFormat) => {
  return (new Date(dateFormat)).getTime();
}

// validate standar
const validaDateString = (dateString) => {
  
  let numberReg = /^-?\d+$|^\d+$/ // solo aceptamos numeros que empiecen con -negativo ó positivos
  let d = '';

  // si dateString es numero
  if( numberReg.test(dateString) ){
    console.log('es numero')
    console.log(new Date(parseInt(dateString)))
    d = new Date(parseInt(dateString))
  }
  // es dateString es letras
  else{
    console.log('es cadena')
    console.log(new Date(dateString + ' UTC'))

    // evaluamos si fecha valida
    if( !Date.parse(dateString) ) {
      console.log('Fecha invalida')
      return false;
    }
    
    d = new Date(dateString + ' UTC')
  }

  const year = d.getFullYear() // 2019
  const month = (d.getMonth() + 1).toString().padStart(2, '0')// 03
  const day = d.getDate().toString().padStart(2, '0') // 09
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  const s=  d.getSeconds().toString().padStart(2, '0')
  const mi = d.getMilliseconds();

  const dateReturn = year + "-" + month + "-" + day + " "+h+":"+m+":"+s +":"+mi;
  console.log(dateReturn)
  return dateReturn;
}

// ROUTES:

app.get("/api/", function (req, res) {

  res.json({
      unix: convertToUNIX(new Date()),
      utc: convertToUTC(new Date())
  });
  
})

app.get("/api/:dateString", function (req, res) {
  
  let { dateString } = req.params;

  // validar fecha
  if(validaDateString(dateString)){

    let date = validaDateString(dateString);
    console.log( Date.parse(date) )
    res.json({
      unix: convertToUNIX(date), //Date.parse(date),
      utc: convertToUTC(date)
    });

  }
  // caso contrario error
  else {

    res.json({
      error: "Invalid Date"
    });

  }

});

// listen for requests :)
var listener = app.listen('3000', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
