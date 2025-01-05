export interface Goal {
    id: string;
    goal: string;
    milestones: Milestone[];
}

export interface Milestone {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Task {
    title: string;
    description: string;
    status: {name: string};
    isCompleted: boolean;
    comment: Comment[];
}

export interface Comment {
    comment: string;
}