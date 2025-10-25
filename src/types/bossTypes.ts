export interface mob {
  id: string,
  title: string,
  bossId:string
  hp: number,
  xp: number,
  maxHp: number
}

export interface miniBoss {
  id: string,
  title: string,
  bossId: string,
  maxHp: number,
  hp: number,
  xp: number,
}

export interface Boss {
  id: string,
  title: string,
  maxHp: number,
  hp: number,
  xp: number,
}