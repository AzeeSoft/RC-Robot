import { RobotComponent, RobotComponentCommandProcessor } from '../RobotComponent';
import { ArduinoController } from './ArduinoController';
import { Logger } from '../../../../tools/misc/Logger';
import { SuccessCallback } from '../../../../tools/misc/CommonTools';
import { Robot } from '../../Robot';
import { CommandClient, CommandClientData } from '../../../command/CommandClient';

import Serialport = require('serialport');

export class ArduinoComponent extends RobotComponent {
    private arduinoController: ArduinoController;

    constructor(robot: Robot) {
        super('Arduino Component', 'arduino', robot, false);
        this.arduinoController = new ArduinoController();
    }

    public sendDataToArduino(data: string, onError: (string) => void) {
        if (this.isFunctional()) {
            this.arduinoController.sendData(data, onError);
        } else {
            onError('Arduino Component is not functional');
        }
    }

    protected onEnable(callback: SuccessCallback, portPath: string) {
        if (!portPath) {
            callback(false, 'Port is undefined');
            return;
        }

        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(
            () => {
                callback(true);
            },
            error => {
                if (error) {
                    callback(false, error.name + ': ' + error.message);
                }
            }
        );
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        this.arduinoController.close(success => {
            callback(success);
        });
    }

    public initCommands(robotComponentCommandProcessor: RobotComponentCommandProcessor) {
        robotComponentCommandProcessor.addInternalCommand(
            `showPorts`,
            (commandClient: CommandClient, ...args) => {
                Serialport.list().then(ports => {
                    const data = new CommandClientData();
                    data.message = `Available Ports\n===============\n`;
                    ports.forEach(port => {
                        let displayName = port.comName;
                        if (port.manufacturer) {
                            displayName += ` (${port.manufacturer})`;
                        }
                        data.message += ` - ${displayName}\n`;
                    });

                    commandClient.sendData(data);
                });
            }
        );
    }
}
