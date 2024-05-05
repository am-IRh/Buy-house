import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
export async function getUsers(req, res) {
	try {
		// Find All registered user
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get user!" });
	}
}

export async function getUser(req, res) {
	const id = req.params.id;
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get user!" });
	}
}

export async function updateUser(req, res) {
	const { username, email, password, avatar } = req.body;
	const id = req.params.id;
	const uid = req.userId;

	// Check Have Body < 
	if (!username && !email && !password && !avatar)
		return res.status(422).json({ message: "Send a data for update" });

	//Check req params id === userId in Cockie
	if (id !== uid) return res.status(403).json({ message: "Not Authorized!" });

	try {
		// Check exist password and hash the new password
		let updatedPassword = null;
		if (password) updatedPassword = Bun.password.hashSync(password, "bcrypt");

		const body = { username, email };
		// update user in database
		const user = await prisma.user.update({
			where: { id },
			data: {
				...body,
				...(updatedPassword && { password: updatedPassword }),
				...(avatar && { avatar }),
			},
		});

		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get user!" });
	}
}

// * Delete the user 
export async function deleteUser(req, res) {
	const id = req.params.id 
	const uid = req.userId;

	//Check req params id === userId in Cockie
	if (id !== uid) return res.status(403).json({ message: "Not Authorized!" });

	try {
		// Delete user with id from db
		await prisma.user.delete({ where: { id } });

		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get user!" });
	}
}