import express from 'express';
import UserService from '../services/user.service';
import { body, CustomValidator } from 'express-validator';

class UserMiddleware {
    isUniqueUser: CustomValidator = value => {
      console.log(`validating email=${value}`);
        return UserService.readByEmail(value).then(user => {
          if (user) {
            return Promise.reject(`E-mail ${user.email} already in use`);
          }
        });
      };
}

export default new UserMiddleware();