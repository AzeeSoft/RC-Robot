import { CommandClient, CommandClientData } from "../CommandClient";
import { WebContents, Event } from "electron";

export class RendererCommandClient extends CommandClient {
  sender: WebContents;
  pendingRendererEvent: Event;

  constructor(sender: WebContents) {
      super();
      this.sender = sender;
  }

  public setPendingRendererEvent(e: Event) {
      this.pendingRendererEvent = e;
  }

  public sendData(data: CommandClientData) {
      this.sender.send('commandClientData', this.getId(), data);
  }

  public returnControl() {
      this.pendingRendererEvent.returnValue = this.getState().getSubCommandChainDescriptor();
  }
}
