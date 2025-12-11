import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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