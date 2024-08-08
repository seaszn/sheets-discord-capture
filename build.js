function exportSheetMedia() { } (() => { "use strict"; var __webpack_modules__ = [, (__unused_webpack_module, exports, __webpack_require__) => { Object.defineProperty(exports, "__esModule", { value: !0 }), exports.exportSheetMedia = function () { const images = [...(0, charts_1.getChartImages)(), ...(0, table_1.getTableImages)()], url = PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL"); if (!url) throw new Error('webhook url ("WEBHOOK_URL") not set'); for (var chartImage of images) { UrlFetchApp.fetch(url, { method: "post", payload: { content: "sample text", file: chartImage }, muteHttpExceptions: !0 }); console.log("message succesfull") } }; const charts_1 = __webpack_require__(2), table_1 = __webpack_require__(3) }, (__unused_webpack_module, exports, __webpack_require__) => { Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getChartImages = function () { return SpreadsheetApp.getActiveSheet().getCharts().map((x => x.getAs("image/png"))) } }, (__unused_webpack_module, exports, __webpack_require__) => { Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getTableImages = function () { const config = PropertiesService.getScriptProperties().getProperty("table-config"); if (config) { const table = JSON.parse(config), sheet = SpreadsheetApp.getActiveSheet(); return table.map((([name, rangeA1]) => { const range = sheet.getRange(rangeA1), column = range.getColumn(), columnWidth = sheet.getColumnWidth(column), values = range.getDisplayValues(), count = values.flat().filter(String).length, backgrounds = range.getBackgrounds(), fontColors = range.getFontColorObjects(), fontStyles = range.getFontStyles(), fontWeights = range.getFontWeights(), fontSizes = range.getFontSizes(), alignments = range.getHorizontalAlignments(); for (var html = `<b>${name}</b><table border='1'>`, x = 0; x < values.length; x++) { const column = range.getColumn() + x, columnWidth = sheet.getColumnWidth(column); html += "<tr>"; for (var y = 0; y < values[x].length; y++) { html += `<td style='width:${columnWidth}px;text-align:${(() => { switch (alignments[x][y]) { case "general-right": return "right"; case "center": return "center"; default: return "left" } })()};height:20px;background:` + backgrounds[x][y] + ";color:" + fontColors[x][y] + ";font-style:" + fontStyles[x][y] + ";font-weight:" + fontWeights[x][y] + ";font-size:" + (fontSizes[x][y] + 6) + "px;'>" + values[x][y] + "</td>" } html += "</tr>" } return Charts.newTableChart().setDataTable(Charts.newDataTable().addColumn(Charts.ColumnType.STRING, "").addRow([html])).setOption("allowHtml", !0).setDimensions(columnWidth, 28 * count).build().getAs("image/png") })) } throw new Error("No table config configurated inside the sheet") } }], __webpack_module_cache__ = {}; function __webpack_require__(moduleId) { var cachedModule = __webpack_module_cache__[moduleId]; if (void 0 !== cachedModule) return cachedModule.exports; var module = __webpack_module_cache__[moduleId] = { exports: {} }; return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), module.exports } __webpack_require__.g = function () { if ("object" == typeof globalThis) return globalThis; try { return this || new Function("return this")() } catch (e) { if ("object" == typeof window) return window } }(); var __webpack_exports__ = {}; (() => { var exports = __webpack_exports__; Object.defineProperty(exports, "__esModule", { value: !0 }); const _1 = __webpack_require__(1); __webpack_require__.g.exportSheetMedia = _1.exportSheetMedia })() })();
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