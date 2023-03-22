import SimpleFighter from './SimpleFighter';
import Energy from '../Energy';

export default interface Fighter extends SimpleFighter {
  defense: number;
  energy?: Energy;
  special?(enemy: SimpleFighter): void;
  levelUp(): void;
}
