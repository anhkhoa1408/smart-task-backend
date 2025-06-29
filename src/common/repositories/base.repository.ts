import { PrismaService } from '../../libs/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class BaseRepository<
  T,
  WhereUniqueInput,
  WhereInput,
  CreateInput,
  UpdateInput,
  OrderInput,
  SelectInput,
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly model: Prisma.ModelName,
  ) {}

  async findUnique(params: {
    where: WhereUniqueInput;
    select?: SelectInput | null;
  }): Promise<T | null> {
    const { where, select } = params;
    return this.prismaService[this.model].findUnique({
      where,
      select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: WhereUniqueInput;
    where?: WhereInput;
    orderBy: OrderInput;
    select?: SelectInput | null;
  }): Promise<T[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.prismaService[this.model].findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async create(data: CreateInput, select?: SelectInput | null): Promise<T> {
    return this.prismaService[this.model].create({
      data,
      select,
    });
  }

  async update(params: {
    where: WhereUniqueInput;
    data: UpdateInput;
    select?: SelectInput | null;
  }): Promise<T> {
    const { where, data, select } = params;
    return this.prismaService[this.model].update({
      where,
      data,
      select,
    });
  }

  async delete(where: WhereUniqueInput): Promise<T> {
    return this.prismaService[this.model].delete({
      where,
    });
  }
}
