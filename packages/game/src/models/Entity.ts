export class Entity {
    protected _type: number = 0
    protected _id: number = 0
    protected _isSelected: boolean = false

    public constructor() { }

    public get id() { return this._id }
    public get isSelected() { return this._isSelected }
    public get type() { return this._type }

    public select = (select?: boolean) => this._isSelected = select || !this._isSelected

}