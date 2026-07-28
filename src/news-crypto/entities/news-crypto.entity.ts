import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'crypto_news' })  // ← نام جدید جدول
export class CryptoNewsEntity {
  @ApiProperty({ example: 1, description: 'شناسه یکتای خبر' })
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @ApiProperty({ example: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد', description: 'عنوان خبر' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index()
  title!: string;

  @ApiProperty({ example: 'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری...', description: 'خلاصه خبر' })
  @Column({ type: 'text', nullable: false })
  summary!: string;

  @ApiProperty({ example: 'bitcoin', description: 'دسته‌بندی خبر' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  @Index()
  category!: string;

  @ApiProperty({ example: 'کویندسک', description: 'منبع خبر' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  source!: string;

  @ApiProperty({ example: 1710532800000, description: 'زمان انتشار (تایم‌استمپ)' })
  @Column({ type: 'bigint', nullable: false })
  timestamp!: number;

  @ApiProperty({ example: true, description: 'آیا خبر داغ است؟' })
  @Column({ type: 'boolean', default: false })
  trending!: boolean;

  @ApiProperty({ example: 'https://example.com/news/1', description: 'لینک خبر' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  url!: string;

  @ApiProperty({ example: '2024-03-15T10:30:00Z', description: 'زمان ایجاد' })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-03-15T10:30:00Z', description: 'زمان آخرین بروزرسانی' })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}