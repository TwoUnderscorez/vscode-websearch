import * as vscode from 'vscode';
import { StrItem } from './StrItem';
import * as https from 'https';
import { DuckDuckGoPhrase } from './DuckDuckGoPhrase';
import { AOLPhrase } from "./AOLPhrase";


export function duckduckgo_ac(query: string, output: vscode.QuickPick<StrItem>): void {
    let req = https.request({
        method: 'GET',
        hostname: 'duckduckgo.com',
        port: 443,
        path: `/ac/?q=${encodeURIComponent(query)}`
    }, res => {
        let resBody = '';
        res.setEncoding('UTF-8');
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
            console.log(resBody);
            const inarr: Array<DuckDuckGoPhrase> = JSON.parse(resBody);
            let outarr: Array<StrItem> = new Array<StrItem>();
            if (query.startsWith('!')) {
                outarr = inarr.map(i => new StrItem(i.phrase, i.snippet));
            }
            else {
                outarr = inarr.map(i => new StrItem(i.phrase));
            }
            if (outarr.length < 1) {
                outarr.push(new StrItem(query, 'No suggestions available'))
            }
            else if (query !== outarr[0].text) {
                outarr.splice(0, 0, new StrItem(query));
            }
            output.items = outarr;
        });
    });

    req.end();
}

function decode(str: string) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}

export function google_ac(query: string, output: vscode.QuickPick<StrItem>): void {
    let req = https.request({
        method: 'GET',
        hostname: 'www.google.com',
        port: 443,
        path: `/complete/search?q=${encodeURIComponent(query)}&client=psy-ab`
    }, res => {
        let resBody = '';
        res.setEncoding('UTF-8');
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
            console.log(resBody);
            const indata: any = JSON.parse(resBody);
            let outarr: Array<StrItem> = new Array<StrItem>();
            outarr = indata[1].map((i: any) =>
                new StrItem(decode(
                    i[0].replace(
                        /<([/]?)b>/g, ''))
                )
            );

            if (outarr.length < 1) {
                outarr.push(new StrItem(query, 'No suggestions available'))
            }
            else if (query !== outarr[0].text) {
                outarr.splice(0, 0, new StrItem(query));
            }
            output.items = outarr;
        });
    });

    req.end();
}

export function aol_ac(query: string, output: vscode.QuickPick<StrItem>): void {
    let req = https.request({
        method: 'GET',
        hostname: 'search.aol.com',
        port: 443,
        path: `/sugg/gossip/gossip-us-ura/?output=json&command=${encodeURIComponent(query)}&appid=search.aol.com&nresults=10`
    }, res => {
        let resBody = '';
        res.setEncoding('UTF-8');
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
            console.log(resBody);
            const inarr: Array<AOLPhrase> = JSON.parse(resBody).gossip.results;
            let outarr: Array<StrItem> = new Array<StrItem>();
            outarr = inarr.map(i => new StrItem(i.key));

            if (outarr.length < 1) {
                outarr.push(new StrItem(query, 'No suggestions available'))
            }
            else if (query !== outarr[0].text) {
                outarr.splice(0, 0, new StrItem(query));
            }
            output.items = outarr;
        });
    });

    req.end();
}


export function bing_ac(query: string, output: vscode.QuickPick<StrItem> | undefined): void {
    let req = https.request({
        method: 'GET',
        hostname: 'www.bing.com',
        port: 443,
        path: `/AS/Suggestions?qry=${encodeURIComponent(query)}&cvid=${(Math.floor(Math.random() * 10 ** 20) + 10 ** 19).toString(16) + (Math.floor(Math.random() * 10 ** 20) + 10 ** 19).toString(16)}`
        // cvid is just a random big number in hex base
    }, res => {
        let resBody = '';
        res.setEncoding('UTF-8');
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
            const el = '';
            var data: any = resBody.match
                (/<div class="sa_tm">.*\n *<strong>.*<\/strong>/g);
            console.log(data);

            // let outarr: Array<StrItem> = new Array<StrItem>();
            // outarr = inarr.map(i => new StrItem(i.key));

            // if (outarr.length < 1) {
            //     outarr.push(new StrItem(query, 'No suggestions available'))
            // }
            // else if (query !== outarr[0].text) {
            //     outarr.splice(0, 0, new StrItem(query));
            // }
            // output.items = outarr;
        });
    });

    req.end();
}