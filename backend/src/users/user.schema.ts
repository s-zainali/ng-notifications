import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
    @Prop({required: true, })
    fullName: String;

    @Prop({required: true, unique: true,})
    username: String;

    @Prop({required: true})
    password: String;
}

export const UserSchema = SchemaFactory.createForClass(User)