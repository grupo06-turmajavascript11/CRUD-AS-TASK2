import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@Controller("/usuarios")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
 
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        const find = await this.usuarioService.findById(id)
        if (!find) { throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND); }
        return find;
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    async findByUsuario(@Param('nome') nome: string): Promise<Usuario> {
        const user = await this.usuarioService.findByUsuario(nome);
        if (!user) { throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND); }
        return user;
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        const updated = await this.usuarioService.update(usuario);
        if (!updated) { throw new HttpException('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR); }
        return updated;
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.usuarioService.delete(id);
    }
}