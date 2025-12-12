import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Alimentacao } from '../entities/alimentacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Not, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { UsuarioService } from '../../usuario/services/usuario.service';
import e from 'express';

@Injectable()
export class AlimentacaoService {
  constructor(
    @InjectRepository(Alimentacao)
    private alimentacaoRepository: Repository<Alimentacao>,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Alimentacao[]> {
    return await this.alimentacaoRepository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Alimentacao> {
    const alimentacao = await this.alimentacaoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
        usuario: true,
      },
    });

    if (!alimentacao) {
      throw new HttpException(
        'Alimentacao não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return alimentacao;
  }

  async findByName(name: string): Promise<Alimentacao[]> {
    return await this.alimentacaoRepository.find({
      where: {
        nome: ILike(`%${name}%`),
      },
      relations: {
        categoria: true,
        usuario: true,  
      },
    });
  }

  async create(alimentacao: Alimentacao): Promise<Alimentacao> {
    if (alimentacao.categoria) {
      const categoria = await this.categoriaService.findById(alimentacao.categoria.id);

      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }
    } else if (alimentacao.usuario) {
      const usuario = await this.usuarioService.findById(alimentacao.usuario.id);

      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return await this.alimentacaoRepository.save(alimentacao);
  }

  async update(alimentacao: Alimentacao): Promise<Alimentacao> {
    const buscaAlimentacao = await this.findById(alimentacao.id);

    if (!buscaAlimentacao) {
      throw new HttpException(
        'Alimentacao não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (alimentacao.categoria) {
      const categoria = await this.categoriaService.findById(
        alimentacao.categoria.id,
      );
      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }
    } else if (alimentacao.usuario) {
      const usuario = await this.usuarioService.findById(
        alimentacao.usuario.id,
      );
      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    await this.alimentacaoRepository.update(alimentacao.id, alimentacao);
    return this.findById(alimentacao.id);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaAlimentacao = await this.findById(id);

    if (!buscaAlimentacao)
      throw new HttpException(
        'Alimentacao não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return await this.alimentacaoRepository.delete(id);
  }

  async deleteAll(): Promise<DeleteResult> {
    await this.alimentacaoRepository.clear();
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async buscarRecomendacao(id: number): Promise<Alimentacao[]> {
  const produtoAtual = await this.findById(id);

  return await this.alimentacaoRepository.find({
    where: {
      categoria: {
        id: produtoAtual.categoria.id
      },
      id: Not(id)
    },
    relations: ['categoria', 'usuario'],
    order: {
      preco: 'ASC'
    },
    take: 4
  });
}
}
