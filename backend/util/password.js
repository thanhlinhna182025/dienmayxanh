import config from '../config';
import bcrypt from 'bcrypt';

export const hashPassword = (enterpassword) => {
    return bcrypt.hashSync(enterpassword, config.SALT);
};
export const comparePassword = (enterpassword, hashpassword) => {
    return bcrypt.compareSync(enterpassword, hashpassword);
};
