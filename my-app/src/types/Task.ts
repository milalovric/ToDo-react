export type Task = {
    id?: string;
    title: string;
    description?: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
    category: string;
};

