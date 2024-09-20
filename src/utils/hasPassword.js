import bcrypt from "bcrypt"

/// Hasheo de constrasena

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

/// Validar contrasena

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync( password, user.password )
};