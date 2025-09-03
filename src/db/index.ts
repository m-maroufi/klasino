import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; // <-- مطمئن شو مسیر درست باشه
const db = drizzle(process.env.DATABASE_URL!, { schema });
export default db;
