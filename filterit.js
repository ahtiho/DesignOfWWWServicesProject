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

function myFilterFunction(filterdata, data) {
    var level = filterdata[0].Level;
    var levelsClause = createFilterClause(filterdata, 'Level');
    var regionClause = createFilterClause(filterdata, 'Region');
    var startMonthClause = '';
    var endMonthClause = '';

    if (level.length === 2) {
        startMonthClause = `(U_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')} OR G_Start_Month IN ${createFilterClause(filterdata, 'Start_Month')})`;
        startMonthClause = `(U_End_Month IN ${createFilterClause(filterdata, 'End_Month')} OR G_End_Month IN ${createFilterClause(filterdata, 'End_Month')})`
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

    var query = `
        SELECT *
        FROM ?
        WHERE 1=1
            AND ${levelsClause}
            AND ${regionClause}
            AND ${startMonthClause}
            AND ${endMonthClause}
    `;

    var result = alasql(query, [data]);

    return result;
}



var filterdata = [
    {Level: ['U'], Region: ['Asia', 'Europe'], Start_Month: [], End_Month: []},
];

