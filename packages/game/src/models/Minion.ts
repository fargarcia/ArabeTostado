import { ENTITY_TYPES } from "constants/entities"
import { Entity } from "./Entity"

export interface Props {
    id?: number
    name?: string
    attack?: number
    health?: number
    cost?: number
    minion?: Minion
}

export class Minion extends Entity {
    private _attack: number
    private _canAttack: boolean
    private _cost: number
    private _health: number
    private _name: string

    constructor(props: Props) {
        super()
        const { attack, id, name, health, cost, minion } = props
        this._id = minion?.id || id!
        this._name = minion?.name || name!
        this._attack = minion?.attack || attack!
        this._health = minion?.health || health!
        this._cost = minion?.cost || cost!
        this._canAttack = minion?.canAttack || false
        this._isSelected = minion?.isSelected || false
        this._type = ENTITY_TYPES.MINION
    }

    get attack() { return this._attack }
    get canAttack() { return this._canAttack }
    get cost() { return this._cost }
    get health() { return this._health }
    get name() { return this._name }

    takeDamage = (damage: number, attacker: boolean) => {
        if (attacker) this._canAttack = false
        this._health -= damage
    }
    isDead = (): boolean => this._health <= 0
    enableAttack = () => this._canAttack = true
}