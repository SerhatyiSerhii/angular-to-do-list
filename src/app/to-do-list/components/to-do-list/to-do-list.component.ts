import { Component, OnInit } from "@angular/core";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";
import { switchMap } from "rxjs/operators"
import { Router } from "@angular/router";

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
    toDoList: ToDoItem[];

    constructor(
        private router: Router,
        private toDoService: ToDoService
    ) { }

    ngOnInit(): void {
        this.toDoService.getToDos().subscribe((data: ToDoItem[]) => {
            this.toDoList = data;
        });

        this.toDoService.getToDoListUpdated().pipe(switchMap(() => {
            return this.toDoService.getToDos();
        })).subscribe((data: ToDoItem[]) => {
            this.toDoList = data;
        });
    }

    editToDo(toDo: ToDoItem): void {
        this.router.navigate([`/${toDo.id}`]);
    }

    addToDoItem() {
        this.router.navigate(['add-do-to']);
    }

    deleteToDoItem(id: number): void {
        this.toDoService.deleteToDo(id).subscribe();
    }

    completeRestoreToDo(toDo: ToDoItem): void {
        if (!toDo.done) {
            const date = new Date();

            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            const year = date.getFullYear();     
            
            toDo.done = `${day}-${month}-${year}`;
        } else {
            toDo.done = false;
        }

        this.toDoService.updateToDo(toDo.id, toDo).subscribe();
    }
}