import { Entities } from "constants/entities"
import { Entity } from "./Entity"

export interface MinionProps {
    id: number
    name: string
    attack: number
    health: number
    cost: number
    hasAttacked?: boolean
    selected?: boolean
}

export class Minion extends Entity {
    private name: string
    private attack: number
    private health: number
    private cost: number
    hasAttacked: boolean
    selected: boolean
    type: number = Entities.MINION


    public constructor(minionProps: MinionProps) {
        super()
        this.id = minionProps.id
        this.name = minionProps.name
        this.attack = minionProps.attack
        this.health = minionProps.health
        this.cost = minionProps.cost
        this.hasAttacked = minionProps.hasAttacked || false
        this.selected = minionProps.selected || false
    }

    public getId = (): number => this.id
    public getName = (): string => this.name
    public getAttack = (): number => this.attack
    public getHealth = (): number => this.health
    public getCost = (): number => this.cost
    public select = (select?: boolean) => this.selected = select || !this.selected
    public copy = (): Minion => new Minion({
        id: this.id,
        name: this.name,
        attack: this.attack,
        health: this.health,
        cost: this.cost,
        selected: this.selected,
        hasAttacked: this.hasAttacked
    })
    public takeDamage = (damage: number, attacker: boolean) => {
        if (attacker) this.hasAttacked = true
        this.health -= damage
    }
    public isDead = (): boolean => this.health <= 0
}