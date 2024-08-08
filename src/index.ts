import { getChartImages } from "./charts";
import { getTableImages } from "./table";

export function exportSheetMedia(){
    const images = [...getChartImages(), ...getTableImages()];
    const url = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL')

    if(!url){
        throw new Error('webhook url ("WEBHOOK_URL") not set')
    }

    for (var chartImage of images) {

        const response = UrlFetchApp.fetch(url, {
            method: "post",
            payload: {
                content: "sample text",
                file: chartImage
            },
            muteHttpExceptions: true
        });
    
        console.log('message succesfull')
    }
}