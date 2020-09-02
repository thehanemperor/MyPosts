import "reflect-metadata";
import { MikroORM, EntityManager } from "@mikro-orm/core";
import {__production__ } from './constants';
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/Posts";
const main = async ()=> {
    
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
 
    
    await orm.em.transactional(async (em: EntityManager)=>{
        const god = new Post()
    })
    const app = express()
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver],
            validate: false
        }),
        context: ()=> ({
            em: orm.em
        })
    })    

    apolloServer.applyMiddleware({app})
    app.listen(8080,()=> {
        console.log("Backend Server on 8080")
    })
}

main().catch((err)=> console.log(err));


