import { type } from 'os';
import { exec } from 'child_process';
import { window } from 'vscode';
import { Config } from "./config";
import * as fs from "fs";

const ostype: string = type().toLowerCase();
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
        window.showWarningMessage('Your linux distro is not supported, please set websearch.linux_base_distro in the settings file.');
    };
}

export function detect_linux_distro(extconfig: Config) {
    let distro: string = '';
    if (extconfig.linuxDistro !== undefined) {
        distro = extconfig.linuxDistro.toLowerCase();
    }

    if (fs.existsSync('/etc/debian_version') || distro === 'debian') {
        open_url = (url: string) => {
            exec(`sensible-browser ${url}`);
        };
    }
}

export { open_url, ostype };