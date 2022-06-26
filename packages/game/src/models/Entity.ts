export class Entity {
  protected _type: string;
  protected _id: number;
  protected _isSelected: boolean;

  constructor() {
    this._type = '';
    this._id = 0;
    this._isSelected = false;
  }

  get id() {
    return this._id;
  }
  set id(newId: number) {
    this._id = newId;
  }

  get isSelected() {
    return this._isSelected;
  }

  get type() {
    return this._type;
  }

  get name() {
    return '';
  }

  get cost() {
    return 0;
  }

  get label() {
    return '';
  }
  

  select = (select?: boolean) => (this._isSelected = select || !this._isSelected);
}
