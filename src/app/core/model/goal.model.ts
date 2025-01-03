export interface Goal {
    id: string;
    goal: string;
    milestones: Milestone[];
}

export interface Milestone {
    id: string;
    name: string;
    comments: Comment[];
}

export interface Comment {
    id: string;
    comment: string;
}