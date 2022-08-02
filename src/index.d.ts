import { TypedEmitter } from "tiny-typed-emitter"

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

export class Database extends TypedEmitter<Events> {
  path: any;
  data: any;
  options: opt;
  ready: boolean;
  tables: string[];
  uwu: string;

  constructor(options?: opt)

  start() : void;
  set(key: string, value: any, table: string) : void;
  get(key: string, table: string) : any | undefined;
  delete(key: string, table: string) : boolean | undefined;
  has(key: string, table: string) : boolean | undefined;
  size(table: string) : number | undefined;
  data(table: string) : any | undefined;
  ping(): number;
}