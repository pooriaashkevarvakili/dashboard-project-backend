import { IsString, IsNumber, IsBoolean } from 'class-validator';


export class CreateTraderDto {


    @IsString()
    name!:string;


    @IsNumber()
    totalPnL!:number;


    @IsNumber()
    pnlPercent!:number;


    @IsNumber()
    winRate!:number;


    @IsNumber()
    roi!:number;


    @IsString()
    strategy!:string;


    @IsString()
    riskLevel!:string;


    @IsBoolean()
    isVerified!:boolean;

}