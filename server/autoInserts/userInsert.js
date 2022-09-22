import { Accounts } from "meteor/accounts-base";
export const SEED_USERNAME = "admin";
export const SEED_PASSWORD = "123";

export const userInsert = () => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
          username: SEED_USERNAME,
          password: SEED_PASSWORD,
        });
      }   
}
