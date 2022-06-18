import { Minion } from "./Minion";
import { cloneDeep } from 'lodash';

interface Props {
    minions?: Minion[]
    minionContainer?: MinionContainer
}

export class MinionContainer {
    public minions: Minion[]

    constructor(minions?: Minion[]) {
        this.minions = minions || []
    }

    public addMinion = (minion: Minion) => this.minions.push(minion)
    public getMinions = (): Minion[] => this.minions.map(minion => cloneDeep(minion))
    public findById = (id: number) => this.minions.find(minion => minion.getId() === id)
    public copy = (): MinionContainer => new MinionContainer(this.minions.map(minion => minion.copy()))
    public removeMinion = (removedMinion: Minion) => {
        this.minions = this.minions.filter(minion => minion.id !== removedMinion.id)
    }
    public addOnPostion = (minion: Minion, index: number) => this.minions.splice(index, 0, minion)
    public unselect = () => this.minions.find(minion => minion.selected)?.select()
}