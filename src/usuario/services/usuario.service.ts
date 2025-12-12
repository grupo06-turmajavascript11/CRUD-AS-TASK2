import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    
    ){}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findByUsuario(usuario: string): Promise<Usuario | null> { 
        const buscarUsuario = await this.usuarioRepository.findOne({
            where: {
                nome: (usuario)
            }
        })
        return buscarUsuario;
    }


    async findById(id: number): Promise<Usuario | null> {
        let usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (!usuarioBusca) {
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST);
    }


    async update(usuario: Usuario): Promise<Usuario | null> {
        const usuarioBusca = await this.findById(usuario.id);

        if (!usuarioBusca){
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        await this.usuarioRepository.update(usuario.id, usuario);
        return this.findById(usuario.id);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.usuarioRepository.delete(id);
    }

}