function createFilterClause(filterdata, column) {
    var filterValues = [];
    filterdata.forEach(item => {
        filterValues = filterValues.concat(item[column]);
    });
    if (filterValues.length > 0) {
        return `${column} IN (${filterValues.map(value => `'${value}'`).join(',')})`;
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


function FilterFunction(filterdata, data) {
    var level = filterdata[0].Level;

    if (level != null) {
        if(level === 'U'){
            var levelsClause = `UG = 1`;
        } else if (level === 'G') {
            var levelsClause = `G = 1`;
        }
    }
    var regionClause = createFilterClause(filterdata, 'Region');
    var countryClause = createFilterClause(filterdata, 'Country')
    var priceClause = createFilterClause(filterdata, 'Price')
    var safetyClause = createFilterClause(filterdata, 'Safety')
    var gpaClause = createBinaryClause(filterdata, 'Gpa'); 
    var populationLower = filterdata[0].Population_Lower[0];
    var populationUpper = filterdata[0].Population_Upper[0];
    var populationClause = '';
    if (populationLower != null && populationUpper != null) {
        populationClause = `population >= ${populationLower} AND population <= ${populationUpper}`;
    } else if (populationLower != null) {
        populationClause = `population >= ${populationLower}`;
    } else if (populationUpper != null) {
        populationClause = `population <= ${populationUpper}`;
    }

    var startMonthClause = '';
    var endMonthClause = '';

    if (level.length === 0) {
        startMonthClause = `(U_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')} OR G_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')})`;
        endMonthClause = `(U_End_Month IN ${createFilterClause(filterdata, 'End_Month')} OR G_End_Month IN ${createFilterClause(filterdata, 'End_Month')})`
        languageClause = filterdata[0].Language.map(lang => `(${lang}_UG = 1 OR ${lang}_G = 1)`).join(' AND ');
    } else if (level[0] === 'U') {
        startMonthClause = `U_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')}`;
        endMonthClause = `U_End_Month IN ${createFilterClause(filterdata, 'End_Month')}`;
        languageClause = filterdata[0].Language.map(lang => `${lang}_UG = 1`).join(' AND ');
    } else if (level[0] === 'G') {
        startMonthClause = `G_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')}`;
        endMonthClause = `G_End_Month IN ${createFilterClause(filterdata, 'End_Month')}`;
        languageClause = filterdata[0].Language.map(lang => `${lang}_G = 1`).join(' AND ');

    }

    var clauses = [];
    
    if (levelsClause.length > 0) clauses.push(levelsClause);
    if (regionClause.length > 0) clauses.push(regionClause);
    if (countryClause.length > 0) clauses.push(countryClause);
    if (priceClause.length > 0) clauses.push(priceClause);
    if (safetyClause.length > 0) clauses.push(safetyClause);
    if (gpaClause.length > 0) clauses.push(gpaClause);
    if (populationClause.length > 0) clauses.push(populationClause);
    if (startMonthClause.length > 0) clauses.push(startMonthClause);
    if (endMonthClause.length > 0) clauses.push(endMonthClause);
    if (languageClause.length > 0) clauses.push(languageClause);
    
    var whereClause = clauses.length > 0 ? `WHERE 1=1 AND ${clauses.join(' AND ')}` : 'WHERE 1=1';

    var query = `
        SELECT *
        FROM ?
        ${whereClause}
    `;

    var result = alasql(query, [data]);

    return result;
}



