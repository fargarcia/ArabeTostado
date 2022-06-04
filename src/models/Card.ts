import { Minion, Spell } from "models";
import { Entities } from "constants/entities";
import { Entity } from "./Entity";

export class Card extends Entity {
    private entity: Entity
    readonly id: number
    readonly name: string = ''
    readonly cost: number = 0
    private selected: boolean = false
    type: number = Entities.CARD

    public constructor(entity: Entity) {
        super();
        this.entity = entity
        this.id = entity.getId()
        if (entity.type === Entities.MINION) {
            this.name = (this.entity as unknown as Minion).getName()
            this.cost = (this.entity as unknown as Minion).getCost()
        }
    }
    public copy = (): Card => new Card(this.entity.copy())
    public select = () => this.selected = true;
    public isSelected = (): boolean => this.selected
    public getContainedEntity = (): Entity => this.entity
    public getContainedType = (): number => this.entity.type

}