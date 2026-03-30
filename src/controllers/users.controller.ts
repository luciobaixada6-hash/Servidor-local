import type { Request, Response } from "express"

type User = {
    id: string;
    name: string;
    email: string;
};

const users: User[] = [];

export class UsersController {
    static getAll(req: Request, res: Response): Response {
        return res.status(200).json(users);
    }

    static getOne(req: Request, res: Response): Response {
        const { id } = req.params;
        const user = users.find((u) => u.id === id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    }

    static create(req: Request, res: Response): Response {
        const { id, name, email } = req.body;
        if (!id || !name || !email) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        const exists = users.some((u) => u.id === id || u.email === email);
        if (exists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const user: User = { id, name, email };
        users.push(user);
        return res.status(201).json(user);
    }


    static update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex < 0) {
            return res.status(404).json({ message: 'User not found' });
        }


    }

    static delete(req: Request, res: Response): Response {
        const { id } = req.params;
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex < 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.splice(userIndex, 1);
        return res.status(204).send();
    }
}






async login (req: Request, res: Response) {
    const { email, password } = req.body;   
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Email e senha são obrigatórios",
            data: null
        });
    }

const userData = await UserModel.getById(email as string);

    if (!userData) {
        return res.status(404).json({
            status: "error",
            message: "nao existe nenhuma conta com esse email",
            data: null
        });

    }