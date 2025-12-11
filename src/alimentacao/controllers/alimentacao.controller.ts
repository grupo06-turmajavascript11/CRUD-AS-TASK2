import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Alimentacao } from '../entities/alimentacao.entity';
import { AlimentacaoService } from '../services/alimentacao.service';

@Controller('/alimentacao')
export class AlimentacaoController {
  constructor(private readonly alimentacaoService: AlimentacaoService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Alimentacao[]> {
    return this.alimentacaoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Alimentacao> {
    return this.alimentacaoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<Alimentacao[]> {
    return this.alimentacaoService.findByName(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() alimentacao: Alimentacao): Promise<Alimentacao> {
    return this.alimentacaoService.create(alimentacao);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() alimentacao: Alimentacao): Promise<Alimentacao> {
    return this.alimentacaoService.update(alimentacao);
  }

  @Delete('/all')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAll(): Promise<DeleteResult> {
    return this.alimentacaoService.deleteAll();
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.alimentacaoService.delete(id);
  }
}
