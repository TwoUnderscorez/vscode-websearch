import * as vscode from 'vscode';
import { open_url } from './urlexec';
import * as config from './config';
import { StrItem } from './StrItem';
import * as https from 'https';
import { DuckDuckGoPhrase } from './DuckDuckGoPhrase';


export function execute_search(input: string, extconfig: config.Config): void {
    open_url(`${extconfig.searchEngine.URI}${encodeURI(input)}`);
}

export function get_suggestions(input: string, output: vscode.QuickPick<StrItem>, extconfig: config.Config): void {
    let req = https.request({
        method: 'GET',
        hostname: 'duckduckgo.com',
        port: 443,
        path: `/ac/?q=${encodeURI(input)}`
    }, res => {
        let resBody = '';
        res.setEncoding('UTF-8');
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
            console.log(resBody);
            const inarr: Array<DuckDuckGoPhrase> = JSON.parse(resBody);
            let outarr: Array<StrItem> = new Array<StrItem>();
            if (input.startsWith('!')) {
                outarr = inarr.map(i => new StrItem(i.phrase, i.snippet));
            }
            else {
                outarr = inarr.map(i => new StrItem(i.phrase));
            }
            if (outarr.length < 1) {
                outarr.push(new StrItem(input, 'No suggestions available'))
            }
            else if (input !== outarr[0].text) {
                outarr.splice(0, 0, new StrItem(input));
            }
            output.items = outarr;
        });
    });

    req.end();
}