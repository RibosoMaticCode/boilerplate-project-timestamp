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

// convert unix a date -> Return 2020-12-09
const convertUnixToDate = (unix) => {
  const d = new Date(parseInt(unix))
  const year = d.getFullYear() // 2019
  const month = (d.getMonth() + 1).toString().padStart(2, '0')// 03
  const day = d.getDate().toString().padStart(2, '0') // 09
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  const s=  d.getSeconds().toString().padStart(2, '0')

  const dateReturn = year + "-" + month + "-" + day + " "+h+":"+m+":"+s;
  console.log(dateReturn)
  return dateReturn;
}

// validate format unix -> Return true/false
const isValidUnix = (unix) => {
  let regNumber = /^-?\d+$|^\d+$/ // solo aceptamos numeros que empiecen con -negativo ó positivos
  if( !regNumber.test(unix) ) return false

  dateFormat = convertUnixToDate(unix)
  if (isValidaFormat(dateFormat, false)) return true
  else return false
}

// validate format 2022-01-10 -> Return true/false
const isValidaFormat = (dateFormat, short=true) => {
  // patron
  let dateReg = ''
  if( short ) dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/
  else dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}\s\d{2}[.:]\d{2}[.:]\d{2}$/

  if (dateReg.test(dateFormat)) return true
  else return false
}

// conver to UTC -> Return string Mon, 10 Jan 2022 00:00:00 GMT
const convertToUTC = (dateFormat) => {
  return new Date(dateFormat).toUTCString()
}

// convert to UNIX -> Return string 1641772800000
const convertToUNIX = (dateFormat) => {
  return (new Date(dateFormat)).getTime();
}

// ROUTES:

app.get("/api/", function (req, res) {

  res.json({
      unix: convertToUNIX(new Date()),
      utc: convertToUTC(new Date())
  });
  
})

app.get("/api/:date", function (req, res) {
  // validar fecha
  let { date } = req.params;

  // Usar UTC zona horaria

  // START THE MAGIC!
  if (isValidaFormat(date)) {
    console.log('esta fecha format')

    // todo correcto devuelve datos json
    res.json({
      unix: convertToUNIX(date),
      utc: convertToUTC(date)
    });

  }
  // si fecha unix es valida
  else if (isValidUnix(date)) {
    console.log('esta fecha UNIX')
    convert_date = convertUnixToDate(date)
    res.json({
      unix: parseInt(date),
      utc: convertToUTC(convert_date)
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
