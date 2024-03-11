export type ChecklistItem = {
	checklistItem: string;
	isDone: boolean;
	_id: string;
};

type Attachment = {
	link: string;
	displayText: string;
	_id: string;
};

export type Task = {
	_id: string;
	title: string;
	description: string;
	tags: string[];
	dueDate: string;
	checklists: ChecklistItem[];
	attachments: Attachment[];
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	deletedAt?: string;
};

export type AllTasks = {
	tasks: Task[];
};
