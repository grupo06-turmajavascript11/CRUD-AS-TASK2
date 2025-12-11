import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_categorias'})
export class Categorias {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    descricao: string;

    @OneToMany(() => Alimentacao, (alimentacao) => alimentacao.categoria)
    alimentacao: Alimentacao[];
}