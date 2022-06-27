export class Player {
  private _id: string;
  private _ttl: number;

  constructor(id: string) {
    this._id = id;
    this._ttl = 2;
  }

  get id() {
    return this._id;
  }

  reduceTtl = () => this._ttl--;
  resetTtl = () => (this._ttl = 2);
  hasTtl = (): boolean => this._ttl > 0;
  is = (id: string) => this._id === id;
}