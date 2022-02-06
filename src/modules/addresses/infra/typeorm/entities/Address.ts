import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @Column()
    country: string;

  @Column()
    state: string;

  @Column()
    city: string;

  @Column()
    address: string;

  @Column()
    complement_address: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export default Address;
