export class Player {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  is = (id: string) => this._id === id;
}
