import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';


@Entity('traders')
export class Trader {


    @PrimaryGeneratedColumn()
    id!:number;


    @Column()
    name!:string;


    @Column({
        default:false
    })
    isVerified!:boolean;


    @Column({
        default:false
    })
    isStarred!:boolean;



    @Column({
        type:'numeric',
        precision:12,
        scale:2
    })
    totalPnL!:number;



    @Column({
        type:'numeric',
        precision:5,
        scale:2
    })
    pnlPercent!:number;



    @Column({
        type:'numeric',
        precision:5,
        scale:2
    })
    winRate!:number;



    @Column({
        type:'numeric',
        precision:5,
        scale:2
    })
    roi!:number;



    @Column()
    followers!:number;



    @Column()
    aum!:number;



    @Column()
    avgTrade!:number;



    @Column()
    tradesCount!:number;



    @Column()
    strategy!:string;



    @Column()
    riskLevel!:string;



    @Column({
        default:false
    })
    isCopying!:boolean;



    @Column({
        type:'numeric',
        nullable:true
    })
    copyAmount!:number|null;



    @CreateDateColumn()
    createdAt!:Date;

}