export declare class Database<d=any> {
  path: d
  data: d
  options:  {
    path?: string
    tables?: string[] 
    extension?: string 
    split_object?: string 
    auto_save?: boolean 
  }
  ready: boolean
  tables: string[]
  uwu: string

  constructor(options?: {
    path?: string
    tables?: string[] 
    extension?: string 
    split_object?: string 
    auto_save?: boolean 
  })

  start(): void
  set(table: string, key: string, value: d) : void
  get(table: string, key: string) : d | undefined
  delete(table: string, key: string) : boolean | undefined
  has(table: string, key: string) : boolean | undefined
  size(table: string) : number | undefined
  data(table: string) : d | undefined
  ping(): number
}