import { Migration } from '@mikro-orm/migrations';

export class Migration20260309173336 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "fragrance" ("id" text not null, "name" text not null, "gender" text not null, "top_notes" text not null, "heart_notes" text not null, "base_notes" text not null, "background_color" text not null, "order" integer not null default 0, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "fragrance_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_fragrance_deleted_at" ON "fragrance" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "fragrance" cascade;`);
  }

}
