export class Entity {
    type: number = -1
    id: number = -1

    public constructor() { }

    public getId = (): number => this.id
    public copy = (): any => new Entity()
}