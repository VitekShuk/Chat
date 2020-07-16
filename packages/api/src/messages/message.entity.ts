import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,  
    CreateDateColumn, 
  } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date

  @Column()
  login: string;
}