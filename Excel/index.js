const mysql = require('mysql');
const excel = require('exceljs');
 
// Create a connection to the database
const con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'satyam',
 database: 'dsatt'
});
 
// Open the MySQL connection
con.connect((err) => {
  if (err) throw err;
 
  // -> Query data from MySQL
  con.query("SELECT * FROM registration", function (err, registration, fields) {
    
    const jsonregistration = JSON.parse(JSON.stringify(registration));
    console.log(jsonregistration);
  
    
    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet('registration'); //creating worksheet
   
    //  WorkSheet Header
    worksheet.columns = [
      { header: 'id', key: 'id', width: 10 },
      { header: 'name', key: 'name', width: 45 },
      { header: 'time', key: 'time', width: 100}
    ];
   
    // Add Array Rows
    worksheet.addRows(jsonregistration);
   
    // Write to File
    workbook.xlsx.writeFile("registration.xlsx")
    .then(function() {
      console.log("file saved!");
    });
    
    // -> Close MySQL connection
    con.end(function(err) {
      if (err) {
      return console.log('error:' + err.message);
      }
      console.log('Close the database connection.');
    });
    
    // -> Check 'registration.csv' file in root project folder
  });
});