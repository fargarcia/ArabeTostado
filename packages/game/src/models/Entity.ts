export class Entity {
    protected _type: string = ''
    protected _id: number = 0
    protected _isSelected: boolean = false

    constructor() { }

    get id() { return this._id }
    get isSelected() { return this._isSelected }
    get type() { return this._type }

    set id(newId: number) { this._id = newId }

    select = (select?: boolean) => this._isSelected = select || !this._isSelected

}