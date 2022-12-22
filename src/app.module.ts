import { Module } from '@nestjs/common';
import { MarketInfoController } from './modules/market-info/market-info.controller';
import  MarketInfoService from './modules/market-info/market-info.service';

@Module({
  imports: [],
  controllers: [MarketInfoController],
  providers: [MarketInfoService]
})
export class AppModule { }
