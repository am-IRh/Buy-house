import prisma from "../lib/prisma";

export const getPosts = async (req, res) => {
	try {
		const posts = await prisma.post.findMany();

		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get posts" });
	}
};

export const getPost = async (req, res) => {
	const id = req.params.id;

	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				user: { select: { username: true, avatar: true } },
				postDetail: true,
			},
		});

		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get post" });
	}
};

export const addPost = async (req, res) => {
	const uid = req.userId;
	const b = req.body;

	const postData = {
		title: b.title,
		price: +b.price,
		images: b.images,
		address: b.address,
		city: b.city,
		bedroom: +b.bedroom,
		bathroom: +b.bathroom,
		type: b.type,
		property: b.property,
		latitude: b.latitude,
		longitude: b.longitude,
	};

	const detailBody = {
		desc: b.desc,
		utilities: b.utilities,
		pet: b.pet,
		income: b.income,
		size: +b.size,
		school: +b.school,
		bus: +b.bus,
		restaurant: +b.restaurant,
	};

	try {
		const post = await prisma.post.create({
			data: {
				...postData,
				postDetail: { create: detailBody },
				userId: uid,
			},
		});

		res.status(200).json(post);
	} catch (err) {
		console.error("Error adding post:", err);
		res.status(500).json({ message: "Failed to add post" });
	}
};

export const deletePost = async (req, res) => {
	const id = req.params.id;
	const uid = req.userId;

	try {
		const post = await prisma.post.findUnique({ where: { id } });

		if (uid !== post.userId) return res.status(403).json("Not authorized!");

		const deletePost = await prisma.post.delete({ where: { id } });

		res.status(200).json({ deletePost });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to remove post" });
	}
};
