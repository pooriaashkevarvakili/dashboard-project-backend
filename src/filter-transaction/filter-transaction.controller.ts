import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FilterTransactionService } from './filter-transaction.service';
import { CreateFilterTransactionDto } from './dto/create-filter-transaction.dto';
import { UpdateFilterTransactionDto } from './dto/update-filter-transaction.dto';

@Controller('filter-transaction')
export class FilterTransactionController {
  constructor(private readonly transactionsService: FilterTransactionService) {}

  @Post()
  create(@Body() createFilterTransactionDto: CreateFilterTransactionDto) {
    return this.transactionsService.create(createFilterTransactionDto);
  }
@Get('/search')
findAll(
  @Query('search') search?: string,
  @Query('type') type?: string,
  @Query('coin') coin?: string,
  @Query('from') from?: string,
  @Query('to') to?: string,
) {
  return this.transactionsService.findAll({
    search,
    type,
    coin,
    from,
    to,
  });
}
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilterTransactionDto: UpdateFilterTransactionDto) {
    return this.transactionsService.update(+id, updateFilterTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
