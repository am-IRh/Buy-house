import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// HASH THE PASSWORD
		const hashedPass = Bun.password.hashSync(password, "bcrypt");

		// Create a new user
		await prisma.user.create({
			data: { username, email, password: hashedPass },
		});

		res.status(201).json({ message: ":) User registered successfully" });
	} catch (err) {
		res.status(500).json({ message: ":| Internal Server Error" });
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		// CHECK IF THE USER EXIST
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) return res.status(400).json({ message: "Invalid username or password" });
		
		// CHECK IF THE PASSWORD IS CORRECT
		const isPasswordValid = Bun.password.verifySync(password, user.password);

		if (!isPasswordValid) return res.status(400).json({ message: "Invalid username or password" });

		// GENERATE COOKIE TOKEN AND SEND TO THE USER
		const cookieAge = 1000 * 60 * 60 * 24 * 7; // 7D

		const token = jwt.sign(
			{
				id: user.id,
				isAdmin: false,
			},
			Bun.env.JWT_SECURE_TOKEN,
			{ expiresIn: cookieAge }
		);

		const { password: userPassword, ...userInfo } = user;

		res.cookie("TKN", token, { httpOnly: true, maxAge: cookieAge })
			.status(200)
			.json({ message: "Login Successful", user: userInfo });
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export function logout(_, res) {
	res.clearCookie("TKN").status(200).json({ message: "Logout Successful" });
}