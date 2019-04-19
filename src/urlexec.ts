import * as os from 'os';
import { exec } from 'child_process';
import { window } from 'vscode';
import { Config } from "./config";

const ostype: string = os.type().toLowerCase();
let isLinux: boolean = false;

let open_url = (url: string) => {
    window.showErrorMessage(`${ostype} not supported.`);
};

if (ostype.includes('win')) {
    open_url = (url: string) => {
        exec(`start https://${url}`);
    };
}
else if (ostype.includes('mac')) {
    open_url = (url: string) => {
        exec(`open https://${url}`);
    };
}
else if (ostype.includes('linux')) {
    open_url = (url: string) => {
        window.showWarningMessage('Detected linux distro, still loading config...');
    };
}

function detect_linux_distro(extconfig: Config) {

}

export { open_url };