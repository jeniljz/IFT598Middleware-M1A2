const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const tempLoanData = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLLoan = fs.readFileSync(
    `${__dirname}/template/templateLoan.html`,
    'utf-8'
  );

 const dataObj = JSON.parse(tempLoanData);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) {// call back function
const server = httpServer.createServer( (req, res) =>{// call back function

    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query));// convert to String
    // console.log(JSON.stringify(urlParameter.pathname));// convert to String
    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/user') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });
            //CALCULATE LOAN AMOUNT
            const loanData = dataObj[Number(query.id)];// convert string to numeric value
            const strLoanName = JSON.stringify(loanData);
            //PV=PMT/i[1-1/(1+i)^n]
            let tmpIntPMon = (loanData.interest/100)/12;
            let tmpPMTDInt = loanData.loanAmount/tmpIntPMon;
            let PowCal = Math.pow( [1 + tmpIntPMon] , loanData.loanTermYears);
            let tmpSection = 1 - (1 / PowCal);

            let tmpPaidLoan =  tmpPMTDInt * tmpSection;
            let paidLoan = tmpPaidLoan.toFixed(2)
            // console.log(paidLoan);
            
            const loanHTML = replaceTemplate(templateHTMLLoan, loanData, paidLoan);// function that will replace the course values in the HTML
            res.end(loanHTML);
            // console.log(loanData);
        }
    }
    else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });

//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});

