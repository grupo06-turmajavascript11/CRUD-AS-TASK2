import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alimentacao } from "../../alimentacao/entities/alimentacao.entity";

@Entity ({name: "tb_usuario"})
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @IsEmail()
    @Column({length: 255, nullable: false})
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    senha: string

    @IsNotEmpty()
    @Column({length: 5000, nullable: false})
    foto: string

    @OneToMany(() => Alimentacao, (alimentacao) => alimentacao.usuario)
    alimentacao: Alimentacao[]
}