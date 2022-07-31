import EventEmitter from "node:events"

interface opt {
  path?: string;
  tables?: string[]; 
  extension?: string;
  split_object?: string; 
  auto_save?: boolean;
}

interface Events {
  ready: (db: Database) => any
}

export class Database extends EventEmitter<Events> {
  path: any;
  data: any;
  options: opt;
  ready: boolean;
  tables: string[];
  uwu: string;

  constructor(options?: opt)

  start() : void;
  set(table: string, key: string, value: any) : void;
  get(table: string, key: string) : any | undefined;
  delete(table: string, key: string) : boolean | undefined;
  has(table: string, key: string) : boolean | undefined;
  size(table: string) : number | undefined;
  data(table: string) : any | undefined;
  ping(): number;
}