
export type User = {
    id: string;
    name: string;
    email: string;
};

export const users: User[] = [];



async getByEmail(email: string): Promise<User | null> {