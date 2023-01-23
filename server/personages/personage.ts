class Personage {

  private health: number;
  name = 'Personage';

  constructor(namePers: string, num: number) {
    this.name = namePers;
    this.health = num;
  }

  public getHealth(): number {
    return this.health;
  }

  public setHealth(num: number): void {
    this.health = num;
  }

  public attack() {console.log('attack');}
  public capabilities() {console.log('capabilities');}

}

export default Personage;