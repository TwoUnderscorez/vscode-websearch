import * as vscode from "vscode";

export class Config {
    searchEngines: Array<SearchEngine>;
    searchEngine: SearchEngine;
    constructor() {
        this.searchEngines = Array<SearchEngine>();
        this.searchEngines.push(
            {
                "Name": "DuckDuckGo",
                "URI": "duckduckgo.com/?q="
            },
            {
                "Name": "Google",
                "URI": "www.google.com/search?q="
            },
            {
                "Name": "Bing",
                "URI": "www.bing.com/search?q="
            }
        );
        this.searchEngine = {
            "Name": "DuckDuckGo",
            "URI": "duckduckgo.com/?q="
        };
    }

    loadConfig() {
        let config = vscode.workspace.getConfiguration("websearch");

        this.searchEngines = config.get<Array<SearchEngine>>("engines", this.searchEngines);
        let searchEngine = config.get<string>("default_engine");
        // tslint:disable-next-line: triple-equals
        if (searchEngine != null) {
            this.searchEngines.forEach(element => {
                if (element.Name === searchEngine) {
                    this.searchEngine = element;
                }
            });
        }
    }
}

export interface SearchEngine {
    Name: string;
    URI: string;
}