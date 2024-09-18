import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  OneToMany,
  AfterUpdate,
} from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`removed user with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`updated user with id ${this.id}`);
  }
}
