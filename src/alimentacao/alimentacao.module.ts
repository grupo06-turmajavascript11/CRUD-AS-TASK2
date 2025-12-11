import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimentacao } from './entities/alimentacao.entity';
import { AlimentacaoService } from './services/alimentacao.service';
import { AlimentacaoController } from './controllers/alimentacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alimentacao])],
  providers: [AlimentacaoService],
  controllers: [AlimentacaoController],
  exports: [TypeOrmModule],
})
export class AlimentacaoModule {}
