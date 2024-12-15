import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"

config({ path: ".env.local" })

export const db = drizzle(process.env.DRIZZLE_URL!)