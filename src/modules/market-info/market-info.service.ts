import { Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs";
import { MarketServiceBitrex } from "../market-info/services/market-bitrex.service";
import { MarketBitfinex } from "../market-info/services/market-bifinex.service";
import { Gateway, OP } from "./utils/constants";
import MarketDTO, { } from "../market-info/domain/dtos/market.dto";
import map_bitrex from "./map/bitrex.map";
import map_bitfinex from "../market-info/map/bitfinex.map";
import map_avg from "./map/avg.map";

interface Input {
    symbol: string;
    gateway: string;
    res?: any;
    op?: any;
}

interface OperationInput {
    symbol: string;
    res?: any;
    op?: any;
    amount: string;
}

Injectable()
export default class MarketInfoService {
    bitrex: MarketServiceBitrex;
    bitfinex: MarketBitfinex;

    constructor() {
        this.bitrex = new MarketServiceBitrex()
        this.bitfinex = new MarketBitfinex();
    }

    async op(input: OperationInput) {
        if (input.op == OP.Buy) {
            const result: any = await lastValueFrom(this.bitfinex.buy(input)).catch((e) => {
                if (e.response.status == 500) {
                    return input.res.status(500).json({
                        code: "MARKET_DOES_NOT_EXIST",
                        message: "Symbol not supported yet."
                    })
                }
            });

            if(result.data[0] == 0 && result.data[1] == 0 ){
                return input.res.status(500).json({
                    code: "MARKET_DOES_NOT_EXIST",
                    message: "Symbol not supported yet."
                })
            }

            const output = map_avg(result.data);

            return input.res.status(200).json(output);
        }

        if (input.op == OP.Sell) {
            const result: any = await lastValueFrom(this.bitfinex.buy(input.symbol)).catch((e) => {
                if (e.response.status == 500) {
                    return input.res.status(500).json({
                        code: "MARKET_DOES_NOT_EXIST",
                        message: "Symbol not supported yet."
                    })
                }
            });

            const output = map_avg(result.data);

            return input.res.status(200).json(output);
        }
    }

    async get_market_info(input: Input) {
        if (input.gateway == Gateway.Bitrex) {
            const result: any = await lastValueFrom(this.bitrex.getMarket(input.symbol)).catch((e) => {
                if (e.response.status == 404) {
                    return input.res.status(500).json({
                        code: "MARKET_DOES_NOT_EXIST",
                        message: "Symbol not supported yet."
                    })
                }
            });

            if (result.data) {
                const output: MarketDTO = map_bitrex(result.data || { symbol: "" });

                return input.res.status(200).json(output);
            }
        }

        if (input.gateway == Gateway.Bitfinex) {
            const result: any = await lastValueFrom(this.bitfinex.getMarket(input.symbol)).catch((e) => {
                if (e.response.status == 500) {
                    return input.res.status(500).json({
                        code: "MARKET_DOES_NOT_EXIST",
                        message: "Symbol not supported yet."
                    })
                }
            });

            const output: MarketDTO = map_bitfinex(result.data);
            output.symbol = input.symbol.toUpperCase();

            return input.res.status(200).json(output);
        }
    }

}