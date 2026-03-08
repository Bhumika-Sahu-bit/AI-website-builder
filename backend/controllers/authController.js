import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const UserRegister = async (req,res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        res.status(201).json({message: 'User created' });
        
    } catch (error) {
        res.status(400).json({message: "Signup failed" , error: error.message });
    }
}


export const UserLogin = async (req,res) => {
    const {email,password} = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
          }
        
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ message: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET);


        if (!process.env.JWT_SECRET) {
            console.log("JWT_SECRET missing");
            return res.status(500).json({ message: "JWT_SECRET not set" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , {
            expiresIn: '24h'
        })

        const data = res.status(200).json({token , user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
}