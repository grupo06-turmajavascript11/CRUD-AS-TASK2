import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categorias } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,
  ) {}

  async findAll(): Promise<Categorias[]> {
    return await this.categoriasRepository.find({ relations: { alimentacao: true } });
  }
  async findById(id: number): Promise<Categorias> {
    const categoria = await this.categoriasRepository.findOne({
      where: { id },
      relations: { alimentacao: true },
    });

    if (!categoria)
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return categoria;
  }

  async findByDescricao(descricao: string): Promise<Categorias[]> {
    return await this.categoriasRepository.find({
      where: { descricao: ILike(`%${descricao}%`) },
      relations: { alimentacao: true },
    });
  }

  async create(categoria: Categorias): Promise<Categorias> {
    return await this.categoriasRepository.save(categoria);
  }

  async update(categoria: Categorias): Promise<Categorias> {
    const buscacategoria = await this.findById(categoria.id);

    if (!buscacategoria)
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return await this.categoriasRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscacategoria = await this.findById(id);

    if (!buscacategoria)
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return await this.categoriasRepository.delete(id);
  }
}
