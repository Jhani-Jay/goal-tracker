export interface Goal {
    id: string;
    goal: string;
    milestone: Milestone[];
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