import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alimentacao } from "../../alimentacao/entities/alimentacao.entity";

@Entity({name:'tb_categorias'})
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length:255, nullable:false, unique:true})
    descricao: string;

    
    @OneToMany(() => Alimentacao, (alimentacao) => alimentacao.categoria)
    alimentacao: Alimentacao[];
}