import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";

@Component({
    selector: 'to-do-item',
    templateUrl: './to-do-item.component.html',
    styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent {
    @Input() toDo: ToDoItem;

    constructor(
        private router: Router,
        private toDoService: ToDoService
    ) { }

    editToDo(toDo: ToDoItem): void {
        this.router.navigate([`/${toDo.id}`]);
    }

    deleteToDoItem(id: number): void {
        this.toDoService.deleteToDo(id).subscribe();
    }

    toggleDone(toDo: ToDoItem): void {
        if (!toDo.done) {
            const date = new Date();

            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            const year = date.getFullYear();

            toDo.done = `${day}-${month}-${year}`;
        } else {
            toDo.done = null;
        }

        this.toDoService.updateToDo(toDo.id, toDo).subscribe();
    }
}