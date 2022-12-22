import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import MarketInfoService from './market-info.service';
import MarketDTO from "../market-info/domain/dtos/market.dto"

@Controller("market")
export class MarketInfoController {
  constructor(private readonly marketInfoService: MarketInfoService) {
    this.marketInfoService = new MarketInfoService();
  }

  @Get('/:symbol')
  root(@Param('symbol') symbol, @Query('gateway') gateway, @Res() res) {
    this.marketInfoService.get_market_info({ symbol, gateway, res });
  }

  @Get('/operations/:symbol')
  op(@Param('symbol') symbol, @Query('op') op, @Query('amount') amount, @Res() res) {
    this.marketInfoService.op({ symbol, op, amount, res });
  }

}
