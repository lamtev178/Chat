import { Topic } from 'src/topic/topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  activationLink: string;

  @Column({ default: false })
  isActivated?: boolean;

  @OneToMany(() => Topic, (topic) => topic.author)
  topics?: Topic[];
}
