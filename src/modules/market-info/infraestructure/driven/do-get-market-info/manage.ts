export interface MarketInfo{
    getmarketInfo(symbol:string):Promise<any>
}