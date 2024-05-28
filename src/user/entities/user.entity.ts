import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Declares the class as an entity
export class User {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column() // Specifies a regular column
  name: string;

  @Column()
  age: number;
}