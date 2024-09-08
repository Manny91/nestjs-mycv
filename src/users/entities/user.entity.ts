import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;

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
