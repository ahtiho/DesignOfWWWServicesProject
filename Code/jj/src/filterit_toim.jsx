import alasql from 'alasql'


//Create a clauses for querying data 
function createFilterClause(filterdata, column) {
    var filterValues = [];

    filterdata[column].forEach(item => {
        filterValues = filterValues.concat(item); 
      
    });      
        if (filterValues.length > 0) {

            if (column.includes("month")) {
                return `${filterValues.map(value => `"${value}"`).join(',')}`

            }
            return `${column} IN (${filterValues.map(value => `"${value}"`).join(',')})`;
        }
    return '';
}




export function FilterFunction(filterdata, data) {
    
    //Separate way to create filter for the study level
    var level = filterdata.Level;
    var levelsClause = '';

    if (level.length != 0 && level.length != 2) {
        if(level[0] === 'UG'){
            var levelsClause = `UG = "1"`;
            
        } else if (level[0] === 'G') {
            var levelsClause = `G = "1"`;
        }
    }

    //Define clauses
    var regionClause = createFilterClause(filterdata, 'Region');
    var countryClause = createFilterClause(filterdata, 'Country');
    var priceClause = createFilterClause(filterdata, 'Price');
    var safetyClause = createFilterClause(filterdata, 'Safety');
    var GPAClause = createFilterClause(filterdata, 'Gpa');
    var populationClause = ''
    var languageClause = ''
    var clauses = [];
    // ... Muut suodattimet ...


    //Functions to convert data to a more appropriate format
    function convertMonthNamesToNumbers(monthNames) {
         return monthNames.map(name => monthNamesToNumbers[name]);
      }

    function convertPopulationToNumbers(populations) {
        return populations.map(population => populationToNumbers[population])
    } 
    const startMonthNumbers = convertMonthNamesToNumbers(filterdata['Starting month']);
    const startMonthFilter = createFilterClause({ 'Starting month': startMonthNumbers }, 'Starting month');

    const endMonthNumbers = convertMonthNamesToNumbers(filterdata['Ending month']);
    const endMonthFilter = createFilterClause({ 'Ending month': endMonthNumbers }, 'Ending month');
    
    //Filtering of months
    if (startMonthFilter) {
        let startMonthClauses = [];
        if (level.length === 1 && level.includes('UG')) {
            startMonthClauses.push(`ug_s_start IN (${startMonthFilter})`);
            startMonthClauses.push(`ug_f_start IN (${startMonthFilter})`);
            clauses.push(`(${startMonthClauses.join(' OR ')})`);
        }
        else if (level.length === 1 && level.includes('G')) {
            startMonthClauses.push(`g_s_start IN (${startMonthFilter})`);
            startMonthClauses.push(`g_f_start IN (${startMonthFilter})`);
            clauses.push(`(${startMonthClauses.join(' OR ')})`);
        }
        else {
            console.log("perseensuti", startMonthClauses)
            clauses.push(`ug_f_start IN (${startMonthFilter}) OR ug_s_start IN (${startMonthFilter}) OR g_s_start IN (${startMonthFilter}) OR g_f_start IN (${startMonthFilter})`)
        }
    }

    if (endMonthFilter) {
        let endMonthClauses = [];
        
        if (level.includes('UG')) {
            endMonthClauses.push(`ug_s_end IN (${endMonthFilter})`);
            endMonthClauses.push(`ug_f_end IN (${endMonthFilter})`);
            clauses.push(`(${endMonthClauses.join(' OR ')})`);
            
        }
        else if (level.includes('G')) {
            endMonthClauses.push(`g_s_end IN (${endMonthFilter})`);
            endMonthClauses.push(`g_f_end IN (${endMonthFilter})`);
            clauses.push(`(${endMonthClauses.join(' OR ')})`);
        }
        else {
            clauses.push(`ug_f_end IN (${endMonthFilter}) OR ug_s_end IN (${endMonthFilter}) OR g_s_end IN (${endMonthFilter}) OR g_f_end IN (${endMonthFilter})`)
        }
    } 
    
    //Filtering by language

    if(filterdata["Study Language"].length > 0) {
        if (level.length === 1 && level.includes('UG')) {
            const conditions = filterdata["Study Language"].map(language => `${language}_UG = "1"`);
            languageClause = conditions.join(' OR ');
        }
        else if(level.length === 1 && level.includes('G')) {
            const conditions = filterdata["Study Language"].map(language => `${language}_G = "1"`);
            languageClause = conditions.join(' OR ');
        }
        else {
            const conditions = filterdata["Study Language"].map(language => `(${language}_UG = "1" OR ${language}_G = "1")`);
            languageClause = conditions.join(' OR ');
            languageClause = `(${languageClause})`
        }}

    const populationNumbers = convertPopulationToNumbers(filterdata['Population'])
    // Filter by population
     if (populationNumbers.length > 0) {
        let populationClauses = [];
    
        if (populationNumbers.includes(5000000)) {
            populationClauses.push(`CAST(CityPop AS NUMBER) > 5000000`);
        }
    
        if (populationNumbers.includes(1000000)) {
            populationClauses.push(`CAST(CityPop AS NUMBER) BETWEEN 1000000 AND 5000000`);
        }
    
        if (populationNumbers.includes(500000)) {
            populationClauses.push(`CAST(CityPop AS NUMBER) BETWEEN 500000 AND 1000000`);
        }
    
        if (populationNumbers.includes(10000)) {
            populationClauses.push(`CAST(CityPop AS NUMBER) BETWEEN 10000 AND 500000`);
        }
    
        clauses.push(`${populationClauses.join(' OR ')}`);
    }    

    //Push the individual clauses in to a common clause
    if (levelsClause.length > 0) clauses.push(levelsClause);
    if (regionClause.length > 0) clauses.push(regionClause);
    if (countryClause.length > 0) clauses.push(countryClause);
    if (priceClause.length > 0) clauses.push(priceClause);
    if (safetyClause.length > 0) clauses.push(safetyClause);
    if (populationClause.length > 0) clauses.push(populationClause);
 
    if (languageClause.length > 0) clauses.push(languageClause);
    //Filtering by the possible additional requirements 
    if (filterdata.Gpa.length > 0){
        let gpaClauses = []
        console.log(data[0]["ADDITIONAL_REQUIREMENTS"])
        if(filterdata.Gpa.length === 1 && filterdata.Gpa.includes("Yes")) {
            gpaClauses.push(`LENGTH(ADDITIONAL_REQUIREMENTS) > 2`);

        } else if (filterdata.Gpa.length === 1 && filterdata.Gpa.includes("No")){
            gpaClauses.push(`LENGTH(ADDITIONAL_REQUIREMENTS) <= 2`);
        } else {
            gpaClauses.push(`LENGTH(ADDITIONAL_REQUIREMENTS) >= 2`);
        }
    clauses.push(`${gpaClauses.join(' OR ')}`) 
    }
    
    var clauses = clauses.map(element => `(${element})`);

    //Create the where clause
    var whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : 'WHERE 1=1';

    if (whereClause === "") {
        var query = `SELECT *
        FROM ?`;
    } else {
        var query = `
        SELECT *
        FROM ?
        ${whereClause}`;
    }
    var result = alasql(query, [data]);
    return result;
}



var languagefilter = ['Eng', 'Jap', 'Ger', 'Fr', 'Ita', 'Nor', 'Spa', 'Por', 'Swe']
var countryfilter = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Czech Republic', 'Denmark', 'France', 'Germany', 'Hungary', 'Iceland', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Peru', 'Poland', 'Portugal', 'Singapore', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'United Kingdom', 'United States'];
var regionfilter = ['Africa', 'Asia', 'Europe (Erasmus) ', 'Europe (Bilat)', 'Latin America', 'North America', 'Oceania']
var monthfilter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthNamesToNumbers = {
    "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6",
    "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
  }; 
const populationToNumbers = {
    "10k - 500k": 10000, "500k - 1 mil": 500000, "1 mil - 5 mil": 1000000, "5 mil +": 5000000
  }; 
export { languagefilter, countryfilter, regionfilter, monthfilter}

