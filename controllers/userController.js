import jwt from 'jsonwebtoken'; // get tokens
import bcrypt from 'bcrypt'; // get tokens
import UserSchema from '../models/user.js';


export const register = async (req, res) => {
    try {
          
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new UserSchema({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
    
        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );
    
        const { passwordHash, ...userData} = user._doc;
    
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Registration failed',
        });
    }


};

export const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
        });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Login or password mismatch',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Authorization failed',
        });
    }
};

export const getMe = async (req, res) => {

    try {
        const user = await UserSchema.findById(req.userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        };
        const { passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access Denied',
        });
    }
};