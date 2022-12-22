
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import crypto from 'crypto';

@Injectable()
class BitfinexClient {
    base: string;
    httpService: HttpService

    constructor() {
        this.base = process.env.BITFINEX_API_URL;
        this.httpService = new HttpService();
    }

    setup(data: any): any {
        let nonce = (Date.now() * 1000).toString()
        let apikey = process.env.BITFINEX_API_KEY;
        let signed = crypto.createHmac('sha384', process.env.BITFINEX_API_SECRET).update(`${data.uri}${nonce}${JSON.stringify({})}`).digest('hex').toString()

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'bfx-apikey': apikey,
                'bfx-nonce': nonce,
                'bfx-signature': signed
            }
        }

        return config;
    }
}

@Injectable()
export class MarketBitfinex extends BitfinexClient {
    constructor() {
        super();
    }

    getMarket(symbol: string) {
        return this.httpService.get(`${this.base}v2/ticker/t${symbol.replace('-', '').toUpperCase()}`);
    }

    buy(input: any) {
        return this.httpService.post(`https://api-pub.bitfinex.com/v2/calc/trade/avg?symbol=t${input.symbol.replace('-', '').toUpperCase()}&amount=${input.amount}`);
    }
}