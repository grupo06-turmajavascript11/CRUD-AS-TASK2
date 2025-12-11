import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Alimentacao } from './alimentacao/entities/alimentacao.entity';
import { AlimentacaoModule } from './alimentacao/alimentacao.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_leveebem',
      entities: [Usuario, Alimentacao],
      synchronize: true,
    }),
    UsuarioModule,
    AlimentacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
