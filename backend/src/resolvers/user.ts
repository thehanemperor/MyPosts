import { Resolver, Query, Mutation, Arg, InputType, Field, Ctx, ObjectType } from "type-graphql";
import { MyContext } from "src/types";
import { User } from '../entities/User'
import argon2 from "argon2"
import {EntityManager} from '@mikro-orm/postgresql'

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FiledError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse{
    @Field(()=> [FiledError],{nullable:true})
    errors?: FiledError[]

    @Field(()=> User, {nullable: true})
    user?: User
}

@Resolver()
export class UserResolver {
    @Query(()=> User, {nullable: true })
    async me(
        @Ctx(){ req, em }:MyContext
    ){
        // not logged in
        if (!req.session!.userId){
            return null
        }
        const user = await em.findOne(User,{id:req.session!.userId})
        return user
    }


    @Mutation(()=>UserResponse)
    async register(
        @Arg("options")options: UsernamePasswordInput,
        @Ctx() { em, req }:MyContext
        ): Promise<UserResponse>{
            if (options.username.length<= 2){
                return {
                    errors:[{
                        field:"username",
                        message:"Username should be greater than 2"
                    }]
                }
            }
            if (options.password.length<= 2){
                return {
                    errors:[{
                        field:"password",
                        message:"Password should be greater than 2"
                    }]
                }
            }


            const hashedPassword = await argon2.hash(options.password)
            let user;
            try{
                const result= await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert({
                    username: options.username, 
                    password: hashedPassword,
                    created_at: new Date(),
                    updated_at: new Date()       
                }).returning("*")
                user = result[0]

            }catch(err){
                if (err.code === '23505'){
                    console.log('duplicated username',err.code)
                    return {
                        errors:[{
                            field:"username",
                            message: "Username already exists"
                        }]
                    }
                }
                console.log('not 23505',err,options.username,hashedPassword)
                return {
                    errors:[{
                        field:err.name,
                        message: err.message
                    }]
                }
            }
            
        // auto login after regiter
        req.session!.userId = user.id
        console.log('create user',user)
        return { user }
    }

    @Mutation(()=>UserResponse)
    async login(
        @Arg("options")options: UsernamePasswordInput,
        @Ctx() { em, req }:MyContext
        ): Promise<UserResponse>{
            const user = await em.findOne(User,{username: options.username});
            if (!user){
                return {
                    errors: [{
                        field:"username",
                        message: "could not find an User with this associated username"
                    }]
                }
            }
            const valid = await argon2.verify(user.password,options.password)
            if (!valid){
                return {
                    errors: [{ 
                        field: "password",
                        message: "Incorrect Password"
                    }]
                }
            }

            req.session!.userId = user.id;

            return {user}
    }


    @Query(()=> String)
    hello(){
        return " Hello from hello.ts"
    }
}