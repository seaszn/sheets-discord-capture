export function getChartImages() {
    const sheet = SpreadsheetApp.getActiveSheet();
    return sheet.getCharts().map(x => x.getAs("image/png"))
}
