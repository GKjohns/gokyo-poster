export interface Technique {
  id: string
  romaji: string
  kanji: string
  english: string
  mechanic: string
  analogy_name: string
  analogy: string
  why_it_maps: string
  image_prompt: string
}

export interface Group {
  id: number
  name: string
  kanji: string
  meaning: string
  techniques: Technique[]
}
