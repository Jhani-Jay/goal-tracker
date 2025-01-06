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
    name: string;
    description: string;
    status: {name: string};
    isCompleted: boolean;
    comments: string[];
}

export interface Comment {
    comment: string;
}