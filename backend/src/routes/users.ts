import { Router, Request, Response } from "express";
import { User } from "../types/user";

const router = Router();

// temp in memory database
let users: User[] = [
  {
    id: 1,
    name: "David Liberal",
    email: "david@email.com",
    major: "Computer Science",
    interests: ["gym", "hiking"],
  },
];

// GET route - return all users
router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

// POST /users - add a new user
router.post("/", (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    major: req.body.major,
    interests: req.body.interests || [],
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
