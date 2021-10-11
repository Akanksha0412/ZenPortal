export interface student {
    id?:number,
    roll:number,
    name: string,
    email: string,
    phoneNumber: string,
    track: string,
    status: boolean
}

export interface attendance{
    id?:number,
    date:string,
    present:Array<student>
}

export interface chartData{
    name:string,
    value:number
}