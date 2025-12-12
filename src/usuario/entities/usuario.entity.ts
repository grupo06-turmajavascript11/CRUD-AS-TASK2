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
    @Column({length: 255, nullable: false, unique: true})
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    senha: string

    @Column({length: 5000, nullable: true})
    foto: string

    @OneToMany(() => Alimentacao, (alimentacao) => alimentacao.usuario)
    alimentacao: Alimentacao[]
}