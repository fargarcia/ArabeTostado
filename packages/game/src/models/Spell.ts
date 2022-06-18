export interface SpellProps {
    id: number
    name: string
    cost: number
}

export class Spell {
    private id: number
    private name: string
    private cost: number

    public constructor(spellProps: SpellProps) {
        this.id = spellProps.id
        this.name = spellProps.name
        this.cost = spellProps.cost
    }

    public getId = (): number => this.id
    public getName = (): string => this.name
    public getCost = (): number => this.cost
}