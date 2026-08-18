import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type NotificationDocument = Notification & Document

@Schema({timestamps: true})
export class Notification {
    @Prop({required: true})
    header: string

    @Prop({required: true})
    body: string

    @Prop({required: true, enum: ['INFO', 'WARNING', 'ERROR']})
    category: string

    @Prop({required:true, default:false})
    isClosed: boolean
    
    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, })
    userId: MongooseSchema.Types.ObjectId
    
    @Prop({required:true, type: Number})
    date: number 

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);