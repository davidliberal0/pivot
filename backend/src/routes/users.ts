import { Router, Request, Response } from "express";
import { db } from "../firebase";
import { User } from "../types/user";

const router = Router();
const usersCollection = db.collection("users");

// GET route - return all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const snapshot = await usersCollection.get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).send("Failed to fetch users");
  }
});

// POST /users → add new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, location, major, interests } = req.body;

    // Validate required fields
    if (!name || !email || !location || !major) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser: Omit<User, "id"> = {
      name,
      email,
      location,
      major,
      interests,
    };

    const docRef = await usersCollection.add(newUser);
    const user: User = { id: docRef.id, ...newUser };

    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Failed to add user");
  }
});

export default router;
