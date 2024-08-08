
export function getTableImages() {
    const config = PropertiesService.getScriptProperties().getProperty('table-config');

    if (config) {
        const table: string[][] = JSON.parse(config);
        const sheet = SpreadsheetApp.getActiveSheet();

        return table.map(([name, rangeA1]) => {
            const range = sheet.getRange(rangeA1);
            const column = range.getColumn()
            const columnWidth = sheet.getColumnWidth(column);

            const values = range.getDisplayValues();
            const count = values.flat().filter(String).length;
            const backgrounds = range.getBackgrounds();
            const fontColors = range.getFontColorObjects();
            const fontStyles = range.getFontStyles();
            const fontWeights = range.getFontWeights();
            const fontSizes = range.getFontSizes()
            const alignments = range.getHorizontalAlignments()

            var html = `<b>${name}</b>` + "<table border='1'>";
            for (var x = 0; x < values.length; x++) {
                const column = range.getColumn() + x;
                const columnWidth = sheet.getColumnWidth(column);

                html += "<tr>"
                for (var y = 0; y < values[x].length; y++) {
                    const alignment = (() => {
                        switch(alignments[x][y]){
                            case 'general-right': return 'right';
                            case 'center': return 'center';
                            default: return 'left';
                        }
                    })();

                    html += `<td style='width:${columnWidth}px;text-align:${alignment};height:20px;background:` + backgrounds[x][y] + ";color:" + fontColors[x][y] + ";font-style:" + fontStyles[x][y] + ";font-weight:" + fontWeights[x][y] + ";font-size:" + (fontSizes[x][y] + 6) + "px;'>" + values[x][y] + "</td>";
                }

                html += "</tr>";
            }
            html + "</table>"
            const img = Charts.newTableChart().setDataTable(Charts.newDataTable().addColumn(Charts.ColumnType.STRING, '').addRow([html])).setOption('allowHtml', true).setDimensions(columnWidth, count * 28).build();
            return img.getAs("image/png")
        })
    }
    else {
        throw new Error('No table config configurated inside the sheet');
    }
}

