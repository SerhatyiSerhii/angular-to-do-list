import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";
import { switchMap, takeUntil } from "rxjs/operators"
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
    toDoListToShow: ToDoItem[];
    private toDoList: ToDoItem[];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private toDoService: ToDoService
    ) { }

    ngOnInit(): void {
        this.toDoService.getToDos().subscribe((data: ToDoItem[]) => {
            this.toDoListToShow = this.toDoList = data;
        });

        this.toDoService.getToDoListUpdated().pipe(
            takeUntil(this.destroy$),
            switchMap(() => {
                return this.toDoService.getToDos();
            })
        ).subscribe((data: ToDoItem[]) => {
            this.toDoListToShow = this.toDoList = data;
        });
    }

    addToDoItem(): void {
        this.router.navigate(['add-do-to']);
    }

    toggleToDoList(event: InputEvent, completed: boolean, el: HTMLInputElement): void {
        if (el.checked) {
            el.checked = false;
        }

        if ((event.target as HTMLInputElement).checked) {
            this.toDoListToShow = this.toDoList.filter(toDo => completed ? toDo.done : !toDo.done);
        } else {
            this.toDoListToShow = this.toDoList;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}