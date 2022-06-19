import { Entities } from "constants/entities"
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
    private _cost: number
    private _hasAttacked: boolean
    private _health: number
    private _name: string
    private _isSelected: boolean

    constructor(props: Props) {
        super()
        const {attack, id, name, health, cost, minion} = props
        this._id =  minion?.id || id!
        this._name =  minion?.name || name!
        this._attack =  minion?.attack || attack!
        this._health = minion?.health || health!
        this._cost =  minion?.cost || cost!
        this._hasAttacked = minion?.hasAttacked || false
        this._isSelected = minion?.isSelected || false
        this._type = Entities.MINION
    }

    get attack() { return this._attack }
    get cost() { return this._cost }
    get hasAttacked() { return this._hasAttacked }
    get health() { return this._health }
    get name() { return this._name }
    get isSelected() { return this._isSelected }

    takeDamage = (damage: number, attacker: boolean) => {
        if (attacker) this._hasAttacked = true
        this._health -= damage
    }
    isDead = (): boolean => this._health <= 0
    select = () => this._isSelected = !this._isSelected
}