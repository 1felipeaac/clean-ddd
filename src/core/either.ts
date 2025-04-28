//Error
export class Left<L> {
    readonly value: L

    constructor(value: L){
        this.value = value
    }
}

//Success
export class Right<R> {
    readonly value: R

    constructor(value: R){
        this.value = value
    }
}
export type Either<L, R> = Left<L> | Right<R>
export const left = (value: any) => {
    return new Left(value)
}
export const right = (value: any) => {
    return new Right(value)
}