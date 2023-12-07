import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import uuid from 'uuid';
import { LoginUserDto, RegisterUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async addUser(user: RegisterUserDto): Promise<User> {
    const activationLink = uuid.v4();
    const userWithLink: Omit<User, 'id'> = {
      ...user,
      activationLink: activationLink,
    };
    return this.usersRepository.save(userWithLink);
  }

  async loginUser(user: LoginUserDto): Promise<User> {
    return this.usersRepository.save({ ...user, activationLink: '' });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
