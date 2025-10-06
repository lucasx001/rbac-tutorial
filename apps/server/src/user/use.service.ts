import { Injectable } from "@nestjs/common"
import { db, schema, eq } from "@repo/db"

@Injectable()
export class UsersService {
  async findUserById(id: string) {
    const [data] = await db.select().from(schema.usersTable).where(eq(schema.usersTable.id, id))
    return data
  }

  async findUserByUsername(username: string) {
    const [user] = await db.select().from(schema.usersTable).where(eq(schema.usersTable.username, username))
    return user
  }

  async createUser(username: string, password: string) {
    const [data] = await db
      .insert(schema.usersTable)
      .values({ username, password })
      .returning({ id: schema.usersTable.id })

    return data
  }
}
