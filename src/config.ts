import * as vscode from "vscode";
import { StrItem } from './StrItem';
import { duckduckgo_ac, google_ac } from './autocomplete';
import { SearchEngine } from "./SearchEngine";
export class Config {
    searchEngines: Array<SearchEngine>;
    searchEngine: SearchEngine;
    acEngine: string;
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
        this.searchEngine = this.searchEngines[0];
        this.acEngine = 'duckduckgo';
    }

    get_autocomplete(query: string, output: vscode.QuickPick<StrItem> | undefined): void {
        vscode.window.showErrorMessage(`AutoComplete Error: ${query} not supported`);
    }

    loadConfig() {
        let config = vscode.workspace.getConfiguration("websearch");

        this.searchEngines = config.get<Array<SearchEngine>>("engines", this.searchEngines);

        let searchEngine = config.get<string>("default_engine", this.searchEngines[0].Name).toLowerCase();
        this.searchEngines.forEach(element => {
            if (element.Name.toLowerCase() === searchEngine) {
                this.searchEngine = element;
            }
        });

        this.acEngine = config.get<string>("ac_engine", this.acEngine);
        switch (this.acEngine.toLowerCase()) {
            case 'duckduckgo':
                this.get_autocomplete = duckduckgo_ac;
                break;
            case 'google':
                this.get_autocomplete = google_ac;
                break;
            default:
                this.get_autocomplete(this.acEngine, undefined);
                break;
        }

    }
}

