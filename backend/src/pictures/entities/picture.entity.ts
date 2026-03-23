import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  artistName: string;

  @Column({ type: 'text' })
  imgUrl: string;
}
