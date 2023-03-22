import Character from '../Character';
import Battle from './Battle';

export default class PVP extends Battle {
  private _p1: Character;
  private _p2: Character;

  constructor(p1: Character, p2: Character) {
    super(p1);
    this._p1 = p1;
    this._p2 = p2;
  }

  fight(): number {
    while (this._p1.lifePoints !== -1 && this._p2.lifePoints !== -1) {
      if (this._p1.dexterity > this._p2.dexterity) {
        this._p1.attack(this._p2);
        this._p2.attack(this._p1);
      } else {
        this._p2.attack(this._p1);
        this._p1.attack(this._p2);
      }
    }
    return super.fight();
  }
}
