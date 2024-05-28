import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // Declares the class as an entity
export class User {

  /**
   * User ID as UUID
   * @example "d31fc56c-7aed-441e-9f7f-151be8d85634"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User name
   * @example "John Doe"
   */
  @Column()
  name?: string;

  /**
    * User address
    * @example "World Street 0"
    */
  @Column()
  address?: string;

  /**
   * User createdAt dateString
   * @example "2022-03-26T15:41:28.527Z"
   */
  @CreateDateColumn()
  createdAt?: string | Date;

  /**
   * User updatedAt dateString
   * @example "2022-03-26T15:41:28.527Z"
   */
  @UpdateDateColumn()
  updatedAt?: string | Date;
}