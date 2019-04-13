import * as vscode from 'vscode';
import { open_url } from './urlexec';
import * as config from './config';
import { StrItem } from './StrItem';

export function execute_search(input: string, extconfig: config.Config): void {
    open_url(`${extconfig.searchEngine.URI}${encodeURI(input)}`);
}

export function get_suggestions(input: string, output: vscode.QuickPick<StrItem>, extconfig: config.Config): void {
    extconfig.get_autocomplete(input, output);
}
