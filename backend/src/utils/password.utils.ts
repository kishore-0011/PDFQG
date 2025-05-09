import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;


// Hash password using bcrypt
// @param plain text password
// @returns hashed password

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
};

// compare plain text password with hashed password
// @params password with plain text is compared aganist hashed password
// @return True if password matches else False

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}



