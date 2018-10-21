export interface ActionEventData {
  type?: string
}

export class ActionEvent extends Event {
  public readonly data: ActionEventData

  constructor(data: ActionEventData) {
    super("action")
    this.data = data
  }
}