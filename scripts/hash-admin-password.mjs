import bcrypt from "bcryptjs"

const password = process.argv[2]
if (!password) {
	console.error("Usage: node scripts/hash-admin-password.mjs <password>")
	process.exit(1)
}

const hash = bcrypt.hashSync(password, 12)
const encoded = Buffer.from(hash, "utf8").toString("base64")

console.log("Bcrypt hash:", hash)
console.log("")
console.log("Put this in .env.local (base64 avoids dotenv $ expansion):")
console.log(`ADMIN_PASSWORD_HASH=${encoded}`)
