import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Alimentacao } from './alimentacao/entities/alimentacao.entity';
import { AlimentacaoModule } from './alimentacao/alimentacao.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d5t6393uibrs73cjjqa0-a.oregon-postgres.render.com', 
      port: 5432,
      username: 'db_leveebem_0xev_user',
      password: '1PvBCvDuGflkqw2wj2jKyjNQ9OAiswon',
      database: 'db_leveebem_0xev',
      entities: [Usuario, Alimentacao, Categoria],
      synchronize: false, 
      
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsuarioModule,
    AlimentacaoModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}