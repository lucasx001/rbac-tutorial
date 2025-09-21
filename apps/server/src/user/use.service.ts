import { Injectable } from "@nestjs/common";
import { db, schema, eq } from "@repo/db"

@Injectable()
export class UserService {

    async getUser(id: string) {
        return await db.select().from(schema.usersTable).where(eq(schema.usersTable.id, id))
    }

    async createUser(username: string, password: string) {
        return await db.insert(schema.usersTable).values({ username, password }).returning({ id: schema.usersTable.id })
    }
}