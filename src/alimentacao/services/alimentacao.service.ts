import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Alimentacao } from '../entities/alimentacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class AlimentacaoService {
  constructor(
    @InjectRepository(Alimentacao)
    private alimentacaoRepository: Repository<Alimentacao>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Alimentacao[]> {
    return await this.alimentacaoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Alimentacao> {
    const alimentacao = await this.alimentacaoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
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
}
