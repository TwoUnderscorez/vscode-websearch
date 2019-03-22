import { type } from 'os';
import { exec } from 'child_process';
import { window } from 'vscode';

const ostype: string = type().toLowerCase();

let open_url = (url: string) => {
    window.showErrorMessage(`${ostype} not supported.`);
};

if (ostype.includes('win')) {
    open_url = (url: string) => {
        exec(`start https://${url}`);
    };
}

export { open_url };