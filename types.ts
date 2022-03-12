export interface UnitsByType {
  infantry: Unit[]
  cavalry: Unit[]
  archers: Unit[]
  cavalry_archers: Unit[]
  siege: Unit[]
  naval: Unit[]
}

export interface Unit {
  id: number
  name: string
  slug: string
  icon_url?: string | null
  is_unique?: boolean | null
  civilization?: Civilization | null
  unit_counters?: (UnitCountersEntity | null)[] | null
  units?: UnitsEntity[] | null
  category: string
}
export interface Civilization {
  name: string
  slug: string
}
export interface UnitCountersEntity {
  reason?: string | null
  unit_type: string
  unit_id: number
}
export interface UnitsEntity {
  id: number
  name: string
  icon_url: string
}
