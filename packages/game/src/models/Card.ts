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

  public constructor(props: Props) {
    super();
    const _entity = new Minion({ minion: (props.card ? props.card.entity : props.entity) as Minion });
    this._entity = _entity;
    this._isSelected = props.isSelected || false;
  }

  get entity() {
    return this._entity;
  }
  get name() {
    return this._entity.name;
  }
  get cost() {
    return this._entity.cost;
  }
  get id() {
    return this._entity.id;
  }
  set id(id: number) {
    this._id = id;
    this._entity.id = id;
  }
  get label() {
    return this._entity.label;
  }

  isMinion = (): boolean => this._entity.type === ENTITY_TYPES.MINION;
  isSpell = (): boolean => this._entity.type === ENTITY_TYPES.SPELL;
  isPlayer = (): boolean => this._entity.type === ENTITY_TYPES.PLAYER;
}
