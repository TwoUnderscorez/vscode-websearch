import * as vscode from 'vscode';
import { open_url } from './urlexec';
import * as config from './config';

export function execute_search(input: string, extconfig: config.Config) {
    open_url(`${extconfig.searchEngine.URI}${input}`);
    vscode.window.showInformationMessage(input);
}