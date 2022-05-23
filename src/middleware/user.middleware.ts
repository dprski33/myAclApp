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

      emailExistsOtherUser: CustomValidator = ((value, { req }) => {
        console.log(`confirming email=${value} isn't taken by another user already`);
        return UserService.readByEmail(value).then(user => {
          console.log(`Found user with email=${value}. Checking to see if it's our existing user id=${req.params?.id}`)
          if (user && user.id != req.params?.id) {
              console.log(`Trying to update to user id=${req.params?.id} to existing email=${value} is a big no no`);
            return Promise.reject(`E-mail ${user.email} already in use`);
          }
        });
      });
}

export default new UserMiddleware();