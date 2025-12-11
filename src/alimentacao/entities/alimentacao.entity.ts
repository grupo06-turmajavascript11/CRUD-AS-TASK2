import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_alimentacao' })
export class Alimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  nome: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  preco: number;

  @IsNotEmpty()
  @Column({ type: 'text' })
  ingredientes: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  calorias: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.alimentacoes)
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.alimentacao)
  usuario: Usuario;
}