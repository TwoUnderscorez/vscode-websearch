import * as vscode from "vscode";

export class Config {
    searchEngines: Array<SearchEngine>;
    searchEngine: string;
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
        this.searchEngine = "DuckDuckGo";
    }

    loadConfig() {
        let config = vscode.workspace.getConfiguration("websearch");

        this.searchEngines = config.get<Array<SearchEngine>>("engines", this.searchEngines);
        this.searchEngine = config.get<string>("default_engine", this.searchEngine);
    }
}

export interface SearchEngine {
    Name: string;
    URI: string;
}