import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { ToDoItem } from "../models/to-do-item";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ToDoService {
    private toDoListUpdated$: Subject<void> = new Subject<void>();

    constructor(private api: ApiService) { }

    getToDoListUpdated(): Observable<void> {
        return this.toDoListUpdated$;
    }

    getToDos(): Observable<ToDoItem[]> {
        return this.api.getToDos();
    }

    getToDoById(id: number): Observable<ToDoItem> {
        return this.api.getDoToById(id);
    }

    updateToDo(id: number, toDo: ToDoItem): Observable<ToDoItem> {
        return this.api.updateToDo(id, toDo).pipe(tap(() => {
            this.toDoListUpdated$.next();
        }));;
    }

    addToDo(toDo: ToDoItem) {
        return this.api.addToDo(toDo);
    }

    deleteToDo(id: number) {
        return this.api.deleteToDo(id).pipe(tap(() => {
            this.toDoListUpdated$.next();
        }));
    }
}