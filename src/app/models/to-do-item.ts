export class ToDoItem {
    public readonly id: number;

    constructor(
        public label: string,
        public description: string,
        public category: string,
        public done: string | boolean) {
            this.id = Number(Date.now());
        }
}