
export const shouldBeLoggedIn = (req, res) => {
	if (req.userId) res.status(200).json({ message: "You are Authenticated" });
};


export const shouldBeAdmin = (req, res) => {
		if (!req.isAdmin) {
			return res
				.status(403)
				.json({ message: "Access denied: You must be an administrator." });
		}
		
		res.status(200).json({
			message: "Access granted: You are authenticated as an administrator.",
		});
};
