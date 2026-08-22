import gokyo from '~/assets/gokyo.json'
import type { Group, Technique } from '~/types'

export const groups = gokyo.groups as Group[]

/** All 40 techniques in canonical Gokyo order, each pointing back at its group. */
export const techniques: (Technique & { group: Group })[] = groups.flatMap(group =>
  group.techniques.map(t => ({ ...t, group }))
)

export function findTechnique(id: string) {
  return techniques.find(t => t.id === id)
}

/** Previous and next technique in Gokyo order, wrapping at both ends. */
export function neighbors(id: string) {
  const i = techniques.findIndex(t => t.id === id)
  const n = techniques.length
  return {
    prev: techniques[(i - 1 + n) % n]!,
    next: techniques[(i + 1) % n]!
  }
}
