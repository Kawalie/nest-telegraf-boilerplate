# nest-telegraf-boilerplate

To install dependencies:

```bash
bun install pg --save
bun install
```

To run:

```bash
bun run start:dev
```

src/configuration/congif.yaml example

```yaml
db:
  postgres:
    host: 'localhost'
    port: 5432
    database: 'postgres'
    username: 'postgres'
    password: 'root'

bot:
  token: 'TOKEN'
```