import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { InjectDrizzle } from 'src/shared/modules/drizzle/drizzle.decorator';
import { UsersTable } from 'src/shared/modules/drizzle/schemas/users.schema';
import { DrizzlePg } from 'src/shared/modules/drizzle/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private readonly db: DrizzlePg) {}

  async findAll() {
    const results = await this.db.query.users.findMany();
    return results;
  }

  async findOne(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(UsersTable.id, id),
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create({ fullName, username }: CreateUserDto) {
    const userWithUname = await this.db.query.users.findFirst({
      where: eq(UsersTable.username, username),
    });
    if (userWithUname) {
      throw new BadRequestException(
        'Username is already taken. Please enter another username.',
      );
    }
    return (
      await this.db
        .insert(UsersTable)
        .values({
          fullName,
          username,
        })
        .returning()
    ).at(0);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    if (payload?.username) {
      if (payload.username !== user.username) {
        const userWithUname = await this.db.query.users.findFirst({
          where: eq(UsersTable.username, payload.username),
        });
        if (userWithUname) {
          throw new BadRequestException(
            'Username is already taken. Please enter another username.',
          );
        }
      }
    }
    return (
      await this.db
        .update(UsersTable)
        .set({ username: payload?.username, fullName: payload?.fullName })
        .where(eq(UsersTable.id, id))
        .returning()
    ).at(0);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.db.delete(UsersTable).where(eq(UsersTable.id, id));
    return user;
  }
}
