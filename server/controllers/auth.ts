import dotenv from "dotenv";
import { compare, genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Types } from "mongoose";
import { User } from "../connections/UserConnection";
import { Request, Response } from "../types";
import { validatePassword } from "../Functions/test-password";
import mail from "@sendgrid/mail";

dotenv.config()
mail.setApiKey(process.env.SENDGRID_KEY!)

/* REGISTER USER */
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        //salt and hash
        const salt = await genSalt();
        const passwordHash = await hash(password, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: passwordHash,
        });

        const validationError = newUser.validateSync();
        if (validationError) return res.status(400).json({ message: validationError.message });

        // We search for user with provided email and if we find one we return conflict
        if (await User.findOne({ email: email })) return res.status(409).json({ message: "Email already in use" })
        
        // Save user to db
        var user = await newUser.save();

        //Create token
        const secret: string = process.env.JWT_SECRET!
        const token = sign({ _id: user._id as Types.ObjectId }, secret, { expiresIn: '1d' });
        
        var user = { ...user._doc };
        delete user.password;

        return res.status(200).json({ token: token, user: user });
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

/* LOGGING IN Gives user jwt token that expires in 10 minutes*/
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Check if credintials are valid and user exist
        const { email, password } = req.body;
        var user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        //Create token
        const secret: string = process.env.JWT_SECRET!
        const token = sign({ _id: user._id as Types.ObjectId }, secret, { expiresIn: '1d' });

        //Send token and user info to front
        var user = { ...user._doc };
        delete user.password;
        return res.status(200).json({ token: token, user: user });

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const secret: string = process.env.JWT_SECRET!
        const token = sign({ _id: req.user._id }, secret, { expiresIn: '1d' });

        return res.status(200).json({ token: token });
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        // test email
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).end() // User by that email not found

        // create reset token
        const secret: string = process.env.JWT_SECRET!
        const token = sign({ reset_token: {_id: user._id }}, secret, { expiresIn: '1d' });

        const URL = process.env.APP_URL

        // create reset link
        const resetLink = `${URL}/reset-password?reset_token=${token}`

        // send link via email
        const options = {
            from: 'jaakko.ruhanen@outlook.com',
            to: email,
            subject: 'Salasanan vaihtaminen',
            html: `<a href="${resetLink}" target="_blank">Vaihda salasana</a>`
        }
        
        // Send Mail
        try {
            await mail.send(options)
            console.log('Email sent')
            return res.status(202).end()
        } catch (error) {
            console.error(error)
            return res.status(503).end()
        }

    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Check if reset token and new password is provided
        const { reset_token, password } = req.body
        if (!reset_token || !password) return res.status(401).json({ message: "Access Denied: Invalid payload" });

        // Validate password
        if(!validatePassword(password)) return res.status(40).json({ message: "Password did not meet the requirements" })
        //salt and hash
        const salt = await genSalt();
        const passwordHash = await hash(password, salt);

        try {
            // Verify provided token
            const secret: string = process.env.JWT_SECRET!
            const payload = verify(reset_token, secret) as any
            
            // Try to find user and update users password field
            const user = await User.findByIdAndUpdate(payload.reset_token._id, { "password": passwordHash })
            
            if (!user) return res.status(401).json({ message: "Access Denied: Bad authorization token" });

        } catch (_) {
            return res.status(401).json({ message: "Access Denied: Bad authorization token" });
        }

        // All done send OK to client
        return res.status(204).end()
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

export const createVerifyEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        // test if user is already verified
        if(req.user.verified) return res.status(409).end()

        // create verify_token
        const payload = {
            _id: req.user._id,
            email: req.user.email
        }
        const secret: string = process.env.JWT_SECRET!
        const token = sign({ verification_token: payload }, secret, { expiresIn: '1d' });

        // create reset link
        const URL = process.env.APP_URL
        const verificationLink = `${URL}/verified-email?verification_token=${token}`

        // send link via email
        const options = {
            from: 'jaakko.ruhanen@outlook.com',
            to: req.user.email,
            subject: 'Sähköpostin vahvistaminen - Seuraava Askel',
            html: `<a href="${verificationLink}" target="_blank">Vahvista sähköpostiosoitteesi</a>`
        }
        
        // Send Mail
        try {
            await mail.send(options)
            console.log('Email sent')
            return res.status(202).end()
        } catch (error) {
            console.error(error)
            return res.status(503).end()
        }
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { verification_token } = req.body

        try {
            // Verify provided token
            const secret: string = process.env.JWT_SECRET!
            const payload = verify(verification_token, secret) as any
            
            // Try to find user and update users verified field
            // User email must eq to provided email so we know that current email is being verified
            const filter = { _id: payload.verification_token._id, email: payload.verification_token.email }
            const update = { verified: true }
            const user = await User.findOneAndUpdate(filter, update)
            
            if (!user) return res.status(401).json({ message: "Access Denied: Bad authorization token" });

        } catch {
            return res.status(401).json({ message: "Access Denied: Bad authorization token" });
        }

        // All done send OK to client
        return res.status(204).end()
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}