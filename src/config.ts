import * as vscode from "vscode";
import { StrItem } from './StrItem';
import * as ac from './autocomplete';
import { SearchEngine } from "./SearchEngine";
import { setFlagsFromString } from "v8";
export class Config {
    static conf: Config;
    searchEngines: Array<SearchEngine>;
    searchEngine: SearchEngine;
    acEngine: string;
    tlds: any;
    shouldInsertSelectedText: boolean;
    linuxUrlOpener?: string;
    private constructor() {
        this.searchEngines = Array<SearchEngine>();
        this.tlds = {
            "default": "com"
        };
        this.searchEngines.push(
            {
                "Name": "DuckDuckGo",
                "URI": "duckduckgo.$#$/?q="
            },
            {
                "Name": "Google",
                "URI": "www.google.$#$/search?q="
            },
            {
                "Name": "Bing",
                "URI": "www.bing.$#$/search?q="
            },
            {
                "Name": "AOL",
                "URI": "search.aol.$#$/aol/search?q="
            },
            {
                "Name": "Yahoo",
                "URI": "search.yahoo.$#$/search?&p="
            },
            {
                "Name": "Ask",
                "URI": "www.ask.$#$/web?q="
            },
            {
                "Name": "Yandex",
                "URI": "yandex.$#$/search/?text="
            },
            {
                "Name": "StartPage",
                "URI": "`www.startpage.$#$/do/search?query="
            }
        );
        this.searchEngine = this.searchEngines[0];
        this.acEngine = 'duckduckgo';
        this.shouldInsertSelectedText = true;
    }

    static get_config() {
        if (Config.conf === undefined) {
            Config.conf = new Config();
        }
        return Config.conf;
    }

    get_autocomplete(query: string, output: vscode.QuickPick<StrItem> | undefined): void {
        vscode.window.showErrorMessage(`AutoComplete Error: ${query} not supported`);
    }

    get_search_engine_tld(se: SearchEngine): string {
        if (this.tlds.hasOwnProperty(se.Name.toLowerCase())) {
            return this.tlds[se.Name.toLowerCase()] as string;
        }
        else {
            return this.tlds["default"] as string;
        }
    }

    loadConfig() {
        let config = vscode.workspace.getConfiguration("websearch");

        this.tlds = config.get<Object>("tlds", this.tlds);

        this.searchEngines = config.get<Array<SearchEngine>>("engines", this.searchEngines);

        let searchEngine = config.get<string>("default_engine", this.searchEngines[0].Name).toLowerCase();
        this.searchEngines.forEach(element => {
            if (element.Name.toLowerCase() === searchEngine) {
                this.searchEngine = {
                    "Name": element.Name,
                    "URI": element.URI.replace(
                        "$#$",
                        this.get_search_engine_tld(element)
                    )
                };
            }
        });

        this.acEngine = config.get<string>("ac_engine", this.acEngine);
        switch (this.acEngine.toLowerCase()) {
            case 'duckduckgo':
                this.get_autocomplete = ac.duckduckgo_ac;
                break;
            case 'google':
                this.get_autocomplete = ac.google_ac;
                break;
            case 'aol':
                this.get_autocomplete = ac.aol_ac;
                break;
            default:
                this.get_autocomplete(this.acEngine, undefined);
                break;
        }

        this.shouldInsertSelectedText = config.get<boolean>("insert_selected_text", this.shouldInsertSelectedText);

        this.linuxUrlOpener = config.get<string>("linux_url_launcher");
    }
}

