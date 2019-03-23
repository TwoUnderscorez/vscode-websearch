// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execute_search } from "./search";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Activating "vscode-websearch"...');



	let disposable = vscode.commands.registerCommand('extension.websearch', () => {
		// The code you place here will be executed every time your command is executed
		let input = vscode.window.showInputBox();
		input.then((result) => {
			// tslint:disable-next-line: triple-equals
			if (result != null) {
				execute_search(result);
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
