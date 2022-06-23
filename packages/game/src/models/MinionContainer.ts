import { Minion } from './Minion';

export class MinionContainer {
  private _minions: Minion[];

  constructor(minions?: Minion[] | MinionContainer) {
    this._minions = !minions
      ? []
      : Array.isArray(minions)
      ? minions
      : minions.minions.map((minion) => new Minion({ minion }));
  }

  get minions() {
    return this._minions;
  }

  public addMinion = (minion: Minion) => this._minions.push(minion);
  public findById = (id: number) => this._minions.find((minion) => minion.id === id);
  public removeMinion = (removedMinion: Minion) => {
    this._minions = this._minions.filter((minion) => minion.id !== removedMinion.id);
  };
  public addOnPostion = (minion: Minion, index: number) => this._minions.splice(index, 0, minion);
  public unselect = () => this._minions.find((minion) => minion.isSelected)?.select();
  public enableAttack = (id?: number) =>
    id
      ? this._minions.find((minion) => minion.id === id)?.enableAttack()
      : this._minions.forEach((minion) => minion.enableAttack());
  public minionsCount = (): number => this._minions.length;
}
