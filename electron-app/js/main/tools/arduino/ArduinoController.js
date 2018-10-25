"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../misc/Logger");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
class ArduinoController {
    constructor(portPath = '') {
        this.portPath = '';
        this.port = null;
        this.parser = null;
        this.onDataReceivedListener = null;
        this.setPortPath(portPath);
    }
    setPortPath(portPath = '') {
        this.portPath = portPath;
    }
    setOnDataReceivedListener(onDataReceivedListener) {
        this.onDataReceivedListener = onDataReceivedListener;
    }
    connect(onSucess, onFailure) {
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
    onDataReceived(data) {
        // Do any pre processing of the data if needed here
        if (this.onDataReceivedListener) {
            this.onDataReceivedListener(data);
        }
    }
    isConnected() {
        return (this.port !== null && this.port.isOpen);
    }
    sendData(data, onError) {
        if (this.isConnected()) {
            this.port.write(data, (error, bytesWritten) => {
                if (error) {
                    if (onError) {
                        onError(error);
                    }
                }
            });
        }
        else {
            onError('Arduino is not connected');
        }
    }
    close(callback) {
        if (this.isConnected()) {
            this.port.close(error => {
                if (error) {
                    Logger_1.Logger.debug("Cannot close Arduino connection: " + error);
                    callback(false);
                }
                else {
                    callback(true);
                }
            });
        }
        else {
            callback(true);
        }
    }
}
exports.ArduinoController = ArduinoController;
