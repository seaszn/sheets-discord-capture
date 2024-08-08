/**
 * Multiplies an input value by 2.
 * @param {name} the name of the table.
 * @param {range} the range of the table.
 * @customfunction
*/
function captureConfig(sumRange) {
    const activeRange = SpreadsheetApp.getActiveRange();
    const sheet = activeRange.getSheet();
    const formula = activeRange.getFormula();
    const rangeA1 = formula.match(/\(([^)]+)\)/)?.pop();

    if (rangeA1) {
        const range = sheet.getRange(rangeA1);
        const rangeValues = range.getDisplayValues()

        const config = rangeValues.map((value, index) => {
            const [name, range] = value;

            if (!name || name == '') {
                throw Error(`name on row ${index} cannot be empty`)
            }

            if (!range || range == '') {
                throw Error(`range on row ${index} cannot be empty`)
            }

            return value
        })

        PropertiesService.getScriptProperties().setProperty('table-config', JSON.stringify(config));

        return `Capture Config (Sync OK)`;

    }
    else throw Error("Invalid A1 Notation")
};

/**
 * Defines a tableRange
 * @param {range} the range of the table.
 * @customfunction
*/
function tableRange(range) {
    const activeRange = SpreadsheetApp.getActiveRange();
    const formula = activeRange.getFormula();
    const rangeA1 = formula.match(/\(([^)]+)\)/)?.pop();

    return rangeA1 ?? 'Invalid range'
}