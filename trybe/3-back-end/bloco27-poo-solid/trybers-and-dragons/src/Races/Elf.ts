import Race from './Race';

export default class Elf extends Race {
  private _maxLP: number;
  private static _instances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLP = 99;
    Elf.incrementRacesInstances();
  }

  static incrementRacesInstances() {
    this._instances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLP;
  }

  static createdRacesInstances() {
    return this._instances;
  }
}
