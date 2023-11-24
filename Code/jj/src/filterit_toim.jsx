import alasql from 'alasql'

function createFilterClause(filterdata, column) {
    var filterValues = [];
    console.log(typeof filterdata)
    console.log(filterdata)
    filterdata[column].forEach(item => {
        filterValues = filterValues.concat(item); 
    });      
        if (filterValues.length > 0) {
            return `${column} IN (${filterValues.map(value => `"${value}"`).join(',')})`;
        }
    return '';
}

function createBinaryClause(filterdata, column) {
    if (filterdata[0][column].length > 0) {
        var binaryValue = filterdata[0][column][0];
        if (binaryValue == 0 || binaryValue == 1) {
            return `${column} = ${binaryValue}`;
        }
    }
    return '';
}


export function FilterFunction(filterdata, data) {
    console.log("helou", filterdata.Level)
    var level = filterdata.Level;
    console.log(level)
    var levelsClause = '';

    if (level.length != 0 && level.length != 2) {
        if(level[0] === 'UG'){
            var levelsClause = `UG = "1"`;
            
        } else if (level[0] === 'G') {
            var levelsClause = `G = "1"`;
        }
    }
    var regionClause = createFilterClause(filterdata, 'Region');
    var countryClause = createFilterClause(filterdata, 'Country');
    var priceClause = createFilterClause(filterdata, 'Price');
    var safetyClause = createFilterClause(filterdata, 'Safety');
    //var gpaClause = createBinaryClause(filterdata, ''); 
    //var populationLower = filterdata[0].Population_Lower[0];
    //var populationUpper = filterdata[0].Population_Upper[0];
    var populationClause = '';
    //if (populationLower != null && populationUpper != null) {
    //    populationClause = `population >= ${populationLower} AND population <= ${populationUpper}`;
    //} else if (populationLower != null) {
     //   populationClause = `population >= ${populationLower}`;
    //} else if (populationUpper != null) {
    //    populationClause = `population <= ${populationUpper}`;
    //}
    var languageClause = '';
    var clauses = [];

    // ... Muut suodattimet ...
    function convertMonthNamesToNumbers(monthNames) {
        return monthNames.map(name => monthNamesToNumbers[name]);
      }
    const startMonthNumbers = convertMonthNamesToNumbers(filterdata.Start_Month);
    const startMonthFilter = createFilterClause({ Start_Month: startMonthNumbers }, 'Start_Month');

    const endMonthNumbers = convertMonthNamesToNumbers(filterdata.End_Month);
    const endMonthFilter = createFilterClause({ Start_Month: startMonthNumbers }, 'Start_Month');
    if (startMonthFilter) {
        let startMonthClauses = [];
        if (level.includes('UG')) {
            startMonthClauses.push(`U_Spring_Start IN ${startMonthFilter}`);
            startMonthClauses.push(`U_Fall_Start IN ${startMonthFilter}`);
        }
        if (level.includes('G')) {
            startMonthClauses.push(`G_Spring_Start IN ${startMonthFilter}`);
            startMonthClauses.push(`G_Fall_Start IN ${startMonthFilter}`);
        }
        if (startMonthClauses.length > 0) {
            console.log(startMonthClauses)
            clauses.push(`(${startMonthClauses.join(' OR ')})`);
        }
    }

    if (endMonthFilter) {
        let endMonthClauses = [];
        if (level.includes('UG')) {
            endMonthClauses.push(`U_Spring_End IN ${endMonthFilter}`);
            endMonthClauses.push(`U_Fall_End IN ${endMonthFilter}`);
        }
        if (level.includes('G')) {
            endMonthClauses.push(`G_Spring_End IN ${endMonthFilter}`);
            endMonthClauses.push(`G_Fall_End IN ${endMonthFilter}`);
        }
        if (endMonthClauses.length > 0) {
            console.log(endMonthClauses)
            clauses.push(`(${endMonthClauses.join(' OR ')})`);
        }
    }


    
    if (levelsClause.length > 0) clauses.push(levelsClause);
    if (regionClause.length > 0) clauses.push(regionClause);
    if (countryClause.length > 0) clauses.push(countryClause);
    if (priceClause.length > 0) clauses.push(priceClause);
    if (safetyClause.length > 0) clauses.push(safetyClause);
    console.log(safetyClause)
    //if (gpaClause.length > 0) clauses.push(gpaClause);
    if (populationClause.length > 0) clauses.push(populationClause);
    //if (startMonthClause.length > 0) clauses.push(startMonthClause);
    //if (endMonthClause.length > 0) clauses.push(endMonthClause);
    if (languageClause.length > 0) clauses.push(languageClause);

    var whereClause = clauses.length > 0 ? `WHERE 1=1 AND ${clauses.join(' AND ')}` : 'WHERE 1=1';
    console.log(whereClause)
    if (whereClause === "") {
        var query = `SELECT *
        FROM ?`;
    } else {
        var query = `
        SELECT *
        FROM ?
        ${whereClause}`;
    }

    var query = `
        SELECT *
        FROM ?
        ${whereClause}
    `;
    console.log(query)
    var result = alasql(query, [data]);

    console.log(result);
    return result;
    console.log(result instanceof Promise);
}



var languagefilter = ['Eng', 'Jap', 'Ger', 'Fr', 'Ita', 'Nor', 'Spa']
//var countryfilter = ['South Africa', 'China', 'India', 'Israel', 'Japan', 'Singapore', 'South Korea', 'Taiwan', 'Thailand', 'Austria', 'Belgium', 'Czech Republic', 'Denmark', 'France', 'Germany', 'Hungary', 'Iceland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'Argentina', 'Brazil', 'Chile', 'Mexico', 'Peru', 'Canada', 'United States', 'Australia', 'New Zealand']
var countryfilter = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Czech Republic', 'Denmark', 'France', 'Germany', 'Hungary', 'Iceland', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Peru', 'Poland', 'Portugal', 'Singapore', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'United Kingdom', 'United States'];
var regionfilter = ['Africa', 'Asia', 'Europe (Erasmus) ', 'Europe (Bilat)', 'Latin America', 'North America', 'Oceania']
var monthfilter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthNamesToNumbers = {
    "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6",
    "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
  }; 

export { languagefilter, countryfilter, regionfilter, monthfilter}

