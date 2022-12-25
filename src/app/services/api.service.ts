import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDoItem } from "../models/to-do-item";


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private baseUrl: string = 'http://localhost:3000';

    private get tasksUrl(): string {
        return this.baseUrl + '/tasks';
    }

    constructor(private http: HttpClient) { }

    getToDos(): Observable<ToDoItem[]> {
        return this.http.get<ToDoItem[]>(this.tasksUrl);
    }

    getDoToById(id: number): Observable<ToDoItem> {
        return this.http.get<ToDoItem>(`${this.tasksUrl}/${id}`);
    }

    addToDo(toDo: ToDoItem): Observable<ToDoItem> {
        return this.http.post<ToDoItem>(this.tasksUrl, { ...toDo });
    }

    updateToDo(id: number, toDo: ToDoItem): Observable<ToDoItem> {
        return this.http.patch<ToDoItem>(`${this.tasksUrl}/${id}`, { ...toDo });
    }

    deleteToDo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.tasksUrl}/${id}`);
    }
}