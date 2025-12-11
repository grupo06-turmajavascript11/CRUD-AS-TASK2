import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

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
        return await this.usuarioRepository.findOne({
            where: {
                usuario: (usuario)
            }
        })
    }


    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND); 

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (!usuarioBusca) {
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST);
    }


    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id);
        const usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (usuarioBusca && usuarioBusca.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já cadastrado, digite outro!', HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<void> {
        await this.findById(id);
        await this.usuarioRepository.delete(id);
    }

}