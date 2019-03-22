import * as vscode from 'vscode';
import { open_url } from './urlexec';

export function execute_search(input: string) {
    open_url(`duckduckgo.com/?q=${input}`);
    vscode.window.showInformationMessage(input);
}