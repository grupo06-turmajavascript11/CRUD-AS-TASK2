import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_alimentacao' })
export class Alimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({length: 255, nullable: false})
  nome: string;

  @IsNumber()
  @IsPositive()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  ingredientes: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  calorias: number;

  @IsNotEmpty()
  @ManyToOne(() => Categoria, (categoria) => categoria.alimentacao, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @IsNotEmpty()
  @ManyToOne(() => Usuario, (usuario) => usuario.alimentacao, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}