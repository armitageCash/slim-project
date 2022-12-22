import MarketInfoService from '../../src/modules/market-info/market-info.service';

describe('test suite for market-info-service bitfinex', () => {
  let marketInfoService: MarketInfoService;

  beforeEach(() => {
    marketInfoService = new MarketInfoService();
  });

  describe('request success an return valid response', () => {
    it('return market info for bitfinex', async () => {
      const input = {
        symbol: "BTC-USD",
        gateway: "bitfinex"
      }

      const result: any = {
        "symbol": "BTC-USD",
        "lastTradeRate": 16799,
        "bidRate": 16799,
        "askRate": 16800
      }
      jest.spyOn(marketInfoService, 'get_market_info').mockImplementation(() => result);
      const response: any = await marketInfoService.get_market_info(input);
      expect(response.symbol).toBe("BTC-USD");
    });
  });
});



describe('test suite for market-info-service bitrex', () => {
  let marketInfoService: MarketInfoService;

  beforeEach(() => {
    marketInfoService = new MarketInfoService();
  });


  describe('request success an return valid response', () => {
    it('return MARKET_DOES_NOT_EXIST response code', async () => {

      const marketInfoService = {
        get_market_info: jest.fn().mockResolvedValue({
          code: "MARKET_DOES_NOT_EXIST",
          message: "Symbol not supported yet."
        })
      }

      const input = {
        symbol: "dummy",
        gateway: "bitrex"
      }

      const response: any = await marketInfoService.get_market_info(input);
      expect(response.code).toBe("MARKET_DOES_NOT_EXIST");
    });

    it('return market info for bitrex', async () => {
      const input = {
        symbol: "BTC-USD",
        gateway: "bitrex"
      }

      const result: any = {
        "symbol": "BTC-USD",
        "lastTradeRate": 16799,
        "bidRate": 16799,
        "askRate": 16800
      }
      jest.spyOn(marketInfoService, 'get_market_info').mockImplementation(() => result);
      const response: any = await marketInfoService.get_market_info(input);
      expect(response.symbol).toBe("BTC-USD");
    });
  });
});
