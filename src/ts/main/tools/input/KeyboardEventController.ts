import { CommonTools } from '../../../shared/CommonTools';
type KeyboardEventCallback = (key: string, modifiers: any[], event: any) => void;

export class KeyState {
    public readonly key: string;
    public isPressed: boolean = false;

    public static isKeyPressed(key: string) {
        return (keyStates[key] && keyStates[key].isPressed)
    }

    constructor(key: string) {
        this.key = key;
    }
}

let keyStates: KeyState[] = [];


export class KeyboardEventController {

    public static keyboardEventCallbacks: KeyboardEventCallback[] = [];

    public static onKeyboardEventReceived(key: string, modifiers: any[], event: any) {

        if (!keyStates[key]) {
            keyStates[key] = new KeyState(key);
        }

        switch (event.type) {
            case 'keydown':
                keyStates[key].isPressed = true;
                break;
            case 'keyup':
                keyStates[key].isPressed = false;
                break;
        }

        this.keyboardEventCallbacks.forEach((callback: KeyboardEventCallback) => {
            callback(key, modifiers, event);
        });
    }

    public static addKeyboardEventCallback(callback: KeyboardEventCallback) {
        KeyboardEventController.keyboardEventCallbacks.push(callback);
    }

    public static removeKeyboardEventCallback(callback: KeyboardEventCallback) {
        CommonTools.removeItemFromArray(KeyboardEventController.keyboardEventCallbacks, callback);
    }
}

export { keyStates }