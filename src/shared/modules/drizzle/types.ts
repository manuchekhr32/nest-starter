import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const drizzleTableSchemas = {};

const drizzleTableRelations = {};

export const drizzleSchemas: typeof drizzleTableSchemas &
  typeof drizzleTableRelations = {
  ...drizzleTableSchemas,
  ...drizzleTableRelations,
};

export type DrizzlePg = NodePgDatabase<typeof drizzleSchemas>;
