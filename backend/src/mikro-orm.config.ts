import {__production__ } from "./constants"
import { MikroORM } from '@mikro-orm/core'
import {Post} from './entities/Posts'
import path from 'path'
import { User } from "./entities/User";

export default {
    migrations:{
        path: path.join(__dirname,"./migrations"),
        pattern: /^[\w-]+\d+\.[jt]s$/,
    },
    user:"Harle",
    password:"root",
        dbName: "forum",
        entities:[Post, User],
        type: "postgresql",
        debug: !__production__,
    }as Parameters<typeof MikroORM.init>[0];

