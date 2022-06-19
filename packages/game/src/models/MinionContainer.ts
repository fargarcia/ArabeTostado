import { Minion } from "./Minion";
import { cloneDeep } from 'lodash';

export class MinionContainer {
    private _minions: Minion[]

    constructor(minions?: Minion[] | MinionContainer) {
        this._minions = !minions
        ? []
        : Array.isArray(minions)
            ? minions
            : minions.minions.map(minion => new Minion(minion))
    }

    get minions() { return this._minions }

    public addMinion = (minion: Minion) => this._minions.push(minion)
    public findById = (id: number) => this._minions.find(minion => minion.id === id)
    public removeMinion = (removedMinion: Minion) => {
        this._minions = this._minions.filter(minion => minion.id !== removedMinion.id)
    }
    public addOnPostion = (minion: Minion, index: number) => this._minions.splice(index, 0, minion)
    public unselect = () => this._minions.find(minion => minion.isSelected)?.select()
}