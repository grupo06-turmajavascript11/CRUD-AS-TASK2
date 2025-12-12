import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimentacao } from './entities/alimentacao.entity';
import { AlimentacaoService } from './services/alimentacao.service';
import { AlimentacaoController } from './controllers/alimentacao.controller';
import { CategoriaModule } from '../categoria/categoria.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alimentacao]), CategoriaModule, UsuarioModule],
  providers: [AlimentacaoService],
  controllers: [AlimentacaoController],
  exports: [TypeOrmModule],
})
export class AlimentacaoModule {}
