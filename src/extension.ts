// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execute_search, get_suggestions } from "./search";
import * as config from "./config";
import { StrItem } from './StrItem';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Activating "vscode-websearch"...');

	const extconfig = new config.Config();
	extconfig.loadConfig();

	let disposable = vscode.commands.registerCommand('websearch.search', () => {
		// The code you place here will be executed every time your command is executed
		// showQuickPick();
		let input = vscode.window.createQuickPick<StrItem>();
		input.onDidAccept(() => {
			const result = input.selectedItems[0].name;
			if (result !== undefined) {
				execute_search(result, extconfig);
			}
		});
		input.onDidChangeValue(value => {
			get_suggestions(value, input, extconfig);
		});
		input.title = `Search ${extconfig.searchEngine.Name}`;
		input.placeholder = 'Start typing to search';
		input.onDidHide(() => input.dispose());
		input.show();
	});

	vscode.workspace.onDidChangeConfiguration(function (event) {
		extconfig.loadConfig();
	});

	context.subscriptions.push(disposable);
	console.log('"vscode-websearch" activated!');
}

export function showQuickPick() {
	let i = 0;
	let a = vscode.window.createQuickPick<StrItem>();
	// a.onDidChangeValue(value => {
	// 	if (value !== "") {
	// 		a.items = [
	// 			new StrItem('bbb'),
	// 			new StrItem('ddd')
	// 		]
	// 	}
	// 	else {
	// 		a.items = [];
	// 	}
	// });
	a.items = [
		new StrItem('aaa'),
		new StrItem('ccc')
	];
	a.canSelectMany = false;
	a.enabled = true;
	a.ignoreFocusOut = true;
	a.placeholder = 'test123';
	a.title = 'test title';
	a.value = 'test value';
	a.onDidHide(() => a.dispose());
	a.show();
}

// this method is called when your extension is deactivated
export function deactivate() { }
