import { Logger } from '../misc/Logger';
import { SuccessCallback } from '../misc/CommonTools';
import SerialPort = require('serialport');
import Readline = require('@serialport/parser-readline')
import { ErrorCallback } from 'serialport';

type OnArduinoDataReceivedListener = (data: string) => void;

export class ArduinoController {
    private portPath = '';

    private port: SerialPort = null;
    private parser = null;

    private onDataReceivedListener: OnArduinoDataReceivedListener = null;

    constructor(portPath: string = '') {
        this.setPortPath(portPath);
    }

    public setPortPath(portPath: string = '') {
        this.portPath = portPath;
    }

    public setOnDataReceivedListener(onDataReceivedListener: OnArduinoDataReceivedListener) {
        this.onDataReceivedListener = onDataReceivedListener;
    }

    public connect(onSucess: () => void, onFailure: (error: Error) => void) {
        this.port = new SerialPort(this.portPath, {
            autoOpen: true,
        }, error => {
            onFailure(error);
        });

        this.port.on('open', () => {
            this.parser = this.port.pipe(new Readline({
                delimiter: '\r\n',
            }));

            this.parser.on('data', data => {
                this.onDataReceived(data);
            });

            onSucess();
        });
    }

    private onDataReceived(data: string) {
        // Do any pre processing of the data if needed here

        if (this.onDataReceivedListener) {
            this.onDataReceivedListener(data);
        }
    }

    public isConnected(): boolean {
        return (this.port !== null && this.port.isOpen);
    }

    public sendData(data: string, onError?: (error: string) => void) {
        if (this.isConnected()) {
            this.port.write(data, (error, bytesWritten) => {
                if (error) {
                    if (onError) {
                        onError(error);
                    }
                }
            });
        } else {
            onError('Arduino is not connected');
        }
    }

    public close(callback: SuccessCallback) {
        if (this.isConnected()) {
            this.port.close(error => {
                if (error) {
                    Logger.debug("Cannot close Arduino connection: " + error);
                    callback(false);
                } else {
                    callback(true);
                }
            });
        } else {
            callback(true);
        }
    }
}