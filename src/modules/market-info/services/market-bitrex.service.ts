
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as crypto from 'crypto';

class BitrexClient{
    base : string;
    httpService : HttpService

    constructor(){
        this.base = process.env.BITREX_API_URL;
        this.httpService = new HttpService();
    }

    setup(data:any):any{
        let time = new Date().getTime();
        let apikey =  process.env.BITREX_API_KEY;
        let hash = crypto.createHash('sha512').update(data.payload || '').digest('hex')
        let signed = crypto.createHmac('sha512', process.env.BITREX_API_SECRET).update([time, data.uri, data.method, hash].join('')).digest('hex') 

        let config = {
            headers : {
                'Api-Key' : apikey,
                'Api-Timestamp' : time,
                'Api-Content-Hash' : hash,
                'Api-Signature' :signed
            }
        }

        return config;
    }
}

@Injectable()
export class MarketServiceBitrex extends BitrexClient{
    constructor() {
        super();
    }

    getMarket(symbol:string){
        return this.httpService.get(`${this.base}markets/${symbol}/ticker`, this.setup({
            method : 'GET',
            uri : `${this.base}markets/${symbol}/ticker`
        }));
    }
}