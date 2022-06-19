import { Minion } from "models";
import { Entities } from "constants/entities";
import { Entity } from "./Entity";

interface Props {
    entity?: Entity
    isSelected?: boolean
    card?: Card
}

export class Card extends Entity {
    private _entity: Entity
    private _name: string
    private _cost: number
    private _isSelected: boolean = false

    public constructor(props: Props) {
        super();
        const _entity = new Minion({ minion: (props.card ? props.card.entity : props.entity) as Minion })
        this._entity = _entity
        this._id = _entity.id
        this._isSelected = props.isSelected || false
        this._name = _entity.name
        this._cost = _entity.cost
        this._type = Entities.CARD
    }

    get entity() { return this._entity }
    get name() { return this._name }
    get cost() { return this._cost }
    get isSelected() { return this._isSelected }

    public select = (select?: boolean) => this._isSelected = select || !this._isSelected
}