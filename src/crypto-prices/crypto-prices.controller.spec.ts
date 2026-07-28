import { Test, TestingModule } from '@nestjs/testing';
import { CryptoPricesController } from './crypto-prices.controller';
import { CryptoPricesService } from './crypto-prices.service';

describe('CryptoPricesController', () => {
  let controller: CryptoPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoPricesController],
      providers: [CryptoPricesService],
    }).compile();

    controller = module.get<CryptoPricesController>(CryptoPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
