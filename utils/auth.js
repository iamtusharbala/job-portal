import bcrypt from 'bcrypt'

export const passwordHashing = (password) => {
    try {
        return bcrypt.hashSync(password, 10);
    } catch (error) {
        console.log(error)
    }
}

export const passwordCompare = (password, hashPassword) => {
    try {
        return bcrypt.compareSync(password, hashPassword)
    } catch (error) {
        console.log(error);
    }
}