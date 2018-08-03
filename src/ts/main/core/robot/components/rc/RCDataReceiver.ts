type RCDataReceivedCallback = (data: object) => void;

export abstract class RCDataReceiver {
    protected dataReceivedCallback: RCDataReceivedCallback = (data) => {};  // Assigning a default empty function, so that the callback can be called without null checks.

    public setDataReceivedCallback(dataReceivedCallback: RCDataReceivedCallback) {
        this.dataReceivedCallback = dataReceivedCallback;
    }
}