import { User } from './../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  brand: string;
  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;
  @Column()
  lat: number;

  @Column()
  mileage: number;

  // arrow function to fix with circular dependencies
  // secondary arg is for typorm and how relationship are handled
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
