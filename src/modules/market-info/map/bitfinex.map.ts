import MarketDTO from "../domain/dtos/market.dto";

const map_bitfinex = (input: any): MarketDTO => {
    return {
        symbol: input.symbol || undefined,
        lastTradeRate: input[6],
        bidRate: input[0],
        askRate: input[2]
    }
}

export default map_bitfinex;