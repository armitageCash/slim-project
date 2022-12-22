import MarketInfoService from "../../../market-info.service";

export default class MarketInfo implements MarketInfo {
    constructor(private readonly MarketInfoService: MarketInfoService) {

    }

    getmarketInfo(input: any) {
        return this.MarketInfoService.get_market_info(input);
    }
}