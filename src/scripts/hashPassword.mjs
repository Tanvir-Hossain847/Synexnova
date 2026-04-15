import bcrypt from "bcryptjs";

const password = "Tr0ub4dor#9";
const hash = await bcrypt.hash(password, 12);
console.log("Hash:", hash);

// Verify it works
const valid = await bcrypt.compare(password, hash);
console.log("Verify:", valid);
