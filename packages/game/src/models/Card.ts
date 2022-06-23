import { Minion } from 'models';
import { ENTITY_TYPES } from 'constants/entities';
import { Entity } from './Entity';

interface Props {
  entity?: Entity;
  isSelected?: boolean;
  card?: Card;
}

export class Card extends Entity {
  private _entity: Entity;
  private _name: string;
  private _cost: number;

  public constructor(props: Props) {
    super();
    const _entity = new Minion({ minion: (props.card ? props.card.entity : props.entity) as Minion });
    this._entity = _entity;
    this._id = _entity.id;
    this._isSelected = props.isSelected || false;
    this._name = _entity.name;
    this._cost = _entity.cost;
    this._type = ENTITY_TYPES.CARD;
  }

  get entity() {
    return this._entity;
  }
  get name() {
    return this._name;
  }
  get cost() {
    return this._cost;
  }
  get id() {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
    this._entity.id = id;
  }

  isMinion = (): boolean => this._entity.type === ENTITY_TYPES.MINION;
  isSpell = (): boolean => this._entity.type === ENTITY_TYPES.SPELL;
  isPlayer = (): boolean => this._entity.type === ENTITY_TYPES.PLAYER;
}
