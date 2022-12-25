import { Observable } from "rxjs";
import { ToDoItem } from "./to-do-item";


export interface IApiService {
    getToDos(): Observable<ToDoItem[]>;
    getDoToById(id: number): Observable<ToDoItem>;
    addToDo(toDo: ToDoItem): Observable<ToDoItem>;
    updateToDo(id: number, toDo: ToDoItem): Observable<ToDoItem>;
    deleteToDo(id: number): Observable<void>;
}