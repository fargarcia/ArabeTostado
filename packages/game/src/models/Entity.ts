export class Entity {
    protected _type: number = -1
    protected _id: number = -1

    public constructor() { }

    public get id() { return this._id }
    public get type() { return this._type }
}