export class ToDoItem {
    public readonly id: number;

    constructor(
        public label: string,
        public description: string,
        public category: string,
        public done: string | null
    ) {
        this.id = Date.now();
    }
}