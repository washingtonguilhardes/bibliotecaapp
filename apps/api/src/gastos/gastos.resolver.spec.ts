import { Test, TestingModule } from '@nestjs/testing';
import { GastosResolver } from './gastos.resolver';

describe('GastosResolver', () => {
  let resolver: GastosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosResolver],
    }).compile();

    resolver = module.get<GastosResolver>(GastosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
