import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password length must be 6 symbols').isLength({ min: 6}),
]

export const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password length must be 6 symbols').isLength({ min: 6}),
    body('fullName', 'Enter youe name').isLength({ min: 5}),
    body('avatarUrl', 'Wrong URL').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3}).isString(),
    body('next', 'Enter the text of the article').isLength({ min: 10}).isString(),
    body('tags', 'Invalid tag format (array needed)').optional().isString(),
    body('imageUrl', 'Wrong URL').optional().isString(),
]