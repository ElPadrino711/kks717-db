import EventEmitter from "node:events"

export declare class Database extends EventEmitter <d=any> {
  path: d;
  data: d;
  options:  {
    path?: string;
    tables?: string[];
    extension?: string; 
    split_object?: string; 
    auto_save?: boolean;
  }
  ready: boolean;
  tables: string[];
  uwu: string;

  constructor(options?: {
    path?: string;
    tables?: string[]; 
    extension?: string;
    split_object?: string; 
    auto_save?: boolean;
  })

  start() : undefined;
  set(table: string, key: string, value: d) : undefined;
  get(table: string, key: string) : d | undefined;
  delete(table: string, key: string) : boolean | undefined;
  has(table: string, key: string) : boolean | undefined;
  size(table: string) : number | undefined;
  data(table: string) : d | undefined;
  ping(): number;
}