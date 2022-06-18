import { Minion } from "models";
import { Entities } from "constants/entities";
import { Entity } from "./Entity";

export class Card extends Entity {
    private entity: Entity
    readonly id: number
    readonly name: string = ''
    readonly cost: number = 0
    private selected: boolean = false
    type: number = Entities.CARD

    public constructor(entity: Entity, selected?: boolean) {
        super();
        this.entity = entity
        this.id = entity.getId()
        this.selected = selected || false

        if (entity.type === Entities.MINION) {
            const minion = this.entity as unknown as Minion
            this.name = minion.getName()
            this.cost = minion.getCost()
        }
    }
    public copy = (): Card => new Card(this.entity.copy(), this.selected)
    public select = (select?: boolean) => this.selected = select || !this.selected
    public isSelected = (): boolean => this.selected
    public getContainedEntity = (): Entity => this.entity
    public getContainedType = (): number => this.entity.type

}