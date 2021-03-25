import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@ObjectType()
@Entity("Users", { schema: "dbo" })
export class Users extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Field()
	@Column("varchar", { name: "email", nullable: false, length: 255 })
	email: string;

	@Column("varchar", { name: "password", nullable: false, length: 255 })
	password: string;
}