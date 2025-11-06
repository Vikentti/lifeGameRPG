export interface mob {
  id: string,
  title: string,
  bossId:string
  hp: number,
  xp: number,
  maxHp: number
  stat: string,
}

export interface miniBoss {
  id: string,
  title: string,
  bossId: string,
  maxHp: number,
  hp: number,
  xp: number,
  stat: string,
}

export interface Boss {
  id: string,
  title: string,
  maxHp: number,
  hp: number,
  xp: number,
  stat: string,
}