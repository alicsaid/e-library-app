import bcrypt from "bcrypt";

const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Greška prilikom hashovanja lozinke:", error);
    throw new Error("Greška prilikom hashovanja lozinke");
  }
};

const runHashingExample = async () => {
  const plainPassword = "password1";
  const hashedPassword = await hashPassword(plainPassword);
  console.log("Hashed lozinka:", hashedPassword);
};

runHashingExample();
