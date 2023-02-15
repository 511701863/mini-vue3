export type TextData={
    name:string,
    desc:string
  }
export type Path={
    latitude:number,
    longitude:number,
    name?:string,
    address?:string,
    id?:number
  }
export type markersData = Path[]
