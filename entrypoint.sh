#!/bin/sh

echo "Running drizzle migrations..."
yarn drizzle:migrate

exec "$@"
