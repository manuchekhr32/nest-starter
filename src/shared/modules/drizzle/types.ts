import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UsersTable } from './schemas/users.schema';

export const drizzleTableSchemas = {};

const drizzleTableRelations = {
  users: UsersTable,
};

export const drizzleSchemas: typeof drizzleTableSchemas &
  typeof drizzleTableRelations = {
  ...drizzleTableSchemas,
  ...drizzleTableRelations,
};

export type DrizzlePg = NodePgDatabase<typeof drizzleSchemas>;
