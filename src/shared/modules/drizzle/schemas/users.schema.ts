import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { PgTableName } from '../enum/pg-table-name.enum';

export const UsersTable = pgTable(PgTableName.USERS, {
  id: serial().primaryKey(),
  fullName: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).unique().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
