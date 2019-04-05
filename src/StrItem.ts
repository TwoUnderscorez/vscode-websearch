import * as vscode from 'vscode';
import { setFlagsFromString } from 'v8';

export class StrItem implements vscode.QuickPickItem {
    name: string;
    label: string
    description: string
    constructor(public text: string, desc: string = '') {
        this.name = text;
        this.label = text;
        this.description = desc;
    }
}
