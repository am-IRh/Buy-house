import jwt from "jsonwebtoken";

function statusMessage(status) {
	if (status === 401) return ":| Authentication required: No token provided.";
	else if (status === 403) return ":| Invalid token or Your token has expired";
}

// Check User Token validation
export const verifyToken = (req, res, next) => {
	const TKN = req.cookies.TKN;
	if (!TKN) return res.status(401).json({ message: statusMessage(401) });

	jwt.verify(TKN, process.env.JWT_SECURE_TOKEN, (err, payload) => {
		if (err) return res.status(403).json({ message: statusMessage(403) });
		req.userId = payload.id;
		req.isAdmin = payload.isAdmin;

		next();
	});
};
