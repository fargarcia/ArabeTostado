import { ENTITY_TYPES } from 'constants/entities';
import { Entity } from './Entity';

export interface Props {
  id?: number;
  name?: string;
  attack?: number;
  health?: number;
  cost?: number;
  minion?: Minion;
  label?: string;
}

export class Minion extends Entity {
  private _attack: number;
  private _canAttack: boolean;
  private _cost: number;
  private _health: number;
  private _name: string;
  private _label: string;

  constructor(props: Props) {
    super();
    const { attack, id, name, health, cost, minion, label } = props;
    this._id = minion?.id || id || 0;
    this._name = minion?.name || name || '';
    this._attack = minion?.attack || attack || 0;
    this._health = minion?.health || health || 0;
    this._cost = minion?.cost || cost || 0;
    this._canAttack = minion?.canAttack || false;
    this._isSelected = minion?.isSelected || false;
    this._type = ENTITY_TYPES.MINION;
    this._label = minion?._label || label || '';
  }

  get attack() {
    return this._attack;
  }
  get canAttack() {
    return this._canAttack;
  }
  get cost() {
    return this._cost;
  }
  get health() {
    return this._health;
  }
  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }

  takeDamage = (damage: number, attacker: boolean) => {
    if (attacker) this._canAttack = false;
    this._health -= damage;
  };
  isDead = (): boolean => this._health <= 0;
  enableAttack = () => (this._canAttack = true);
}
