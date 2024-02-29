interface DeltaItem {
  content: string
  cmpName: string
  cmpStatus: string
}

interface ChoiceItem {
  delta: DeltaItem
  index: number
  finish_reason: string | null
}

export interface MessageItem {
  id: string
  object: string
  created: number
  model: string
  choices: ChoiceItem[]
}
