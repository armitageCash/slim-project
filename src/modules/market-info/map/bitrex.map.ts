import MarketDTO from "../domain/dtos/market.dto";

const map_bitrex = (input: any): MarketDTO => {
    return {
        symbol: input.symbol,
        askRate: input.askRate,
        bidRate: input.bidRate,
        lastTradeRate: input.lastTradeRate
    }
}

export default map_bitrex;