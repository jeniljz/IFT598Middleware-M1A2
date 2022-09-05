
module.exports = (htmlStr, loanData, paidLoan)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%NAME%}/g, loanData.customerName);
    output = output.replace(/{%PHNO%}/g, loanData.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, loanData.address);
    output = output.replace(/{%LOANAMOUNT%}/g, loanData.loanAmount);
    output = output.replace(/{%PAIDLOAN%}/g, paidLoan);
    output = output.replace(/{%INTEREST%}/g, loanData.interest);
    output = output.replace(/{%LOANTERMYEARS%}/g, (loanData.loanTermYears/12));
    output = output.replace(/{%ID%}/g, loanData.id);
    output = output.replace(/{%DESC%}/g, loanData.description);
    output = output.replace(/{%LOANTYPE%}/g, loanData.loanType);
    return output;
}