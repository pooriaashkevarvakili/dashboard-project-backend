import { Test, TestingModule } from '@nestjs/testing';
import { CryptoPricesService } from './crypto-prices.service';

describe('CryptoPricesService', () => {
  let service: CryptoPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoPricesService],
    }).compile();

    service = module.get<CryptoPricesService>(CryptoPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
