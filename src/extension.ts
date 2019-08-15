// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execute_search, get_suggestions } from "./search";
import * as config from "./config";
import { StrItem } from './StrItem';
import * as urlexec from './urlexec';
import { Config } from './config';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Activating "vscode-websearch"...');

	const extconfig = Config.get_config();
	extconfig.loadConfig();
	if (urlexec.ostype === 'linux') {
		urlexec.detect_linux_url_launcher(extconfig);
	}

	let disposable = vscode.commands.registerCommand('websearch.search', () => {
		// The code you place here will be executed every time your command is executed
		// showQuickPick();
		let input = vscode.window.createQuickPick<StrItem>();

		const editor = vscode.window.activeTextEditor;
		if (editor !== undefined && extconfig.shouldInsertSelectedText) {
			input.value = editor.document.getText(editor.selection);
			if (input.value.length > 0) {
				get_suggestions(input.value, input, extconfig);
			}
		}

		input.onDidAccept(() => {
			const result = input.selectedItems[0].name;
			if (result !== undefined) {
				execute_search(result, extconfig);
			}
		});

		input.onDidChangeValue(value => {
			get_suggestions(value, input, extconfig);
		});

		input.title = `Search ${extconfig.searchEngine.Name.toString()}`;
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

// this method is called when your extension is deactivated
export function deactivate() { }
