import { IsNumber } from "class-validator";


export class CopyTraderDto {


    @IsNumber()
    amount!:number;


    @IsNumber()
    riskMultiplier!:number;

}