import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ToDoItem } from "../models/to-do-item";
import { ToDoService } from "./to-do.service";

let tasksMock: ToDoItem[] = [
    {
        "id": 1,
        "label": "Kitchen Cleanup",
        "description": "Clean my dirty kitchen",
        "category": "house",
        "done": null
    },
    {
        "id": 2,
        "label": "Taxes",
        "description": "Start doing my taxes and contact my accountant jhon for advice",
        "category": "bureaucracy",
        "done": "25-11-2022"
    }
];

const ToDoServiceMock = {
    getToDos: () => of(tasksMock),
    getToDoById: (id:number) => {
        return of(tasksMock.find(toDo => toDo.id === id));
    },
    updateToDo: (id: number, toDo: ToDoItem) => {
        const updateToDo = tasksMock.find(toDo => toDo.id === id);

        for (const [key, value] of Object.entries(toDo)) {
            updateToDo[key] = value;
        }

        return of(updateToDo);
    },
    addToDo: (toDo: ToDoItem) => {
        tasksMock.push(toDo);

        return of(toDo);
    },
    deleteToDo: (id: number) => {
        const idToDelete = of(tasksMock.find(toDo => toDo.id === id))

        tasksMock = tasksMock.filter(toDo => toDo.id !== id);
        return idToDelete;
    }
}

describe('ToDoService', () => {
    let toDoServiceSpy: ToDoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ToDoService,
                    useValue: ToDoServiceMock,
                }
            ]
        });

        toDoServiceSpy = TestBed.inject<ToDoService>(ToDoService);
    })

    it('should receive to-do list', () => {
        toDoServiceSpy.getToDos().subscribe(response => {
            expect(response).toEqual(tasksMock);
        })
    });

    it('should receive to-do by id', () => {
        const expetedResult = tasksMock.find(toDo => toDo.id === 2);

        toDoServiceSpy.getToDoById(2).subscribe(response => {
            expect(response).toEqual(expetedResult);
        })
    });

    it('should update to-do', () => {
        const tasksCopy = JSON.parse(JSON.stringify(tasksMock));

        const updateToDo = {
            "id": 1,
            "label": "Kitchen Cleanup1234",
            "description": "Clean my dirty kitchen1234",
            "category": "house",
            "done": null
        }

        toDoServiceSpy.updateToDo(updateToDo.id, updateToDo).subscribe(response => {
            expect(response).toEqual(updateToDo);
            expect(updateToDo).not.toEqual(tasksCopy[0]);
            expect(tasksCopy).not.toEqual(tasksMock);
        });
    });

    it('should add to-do', () => {
        const tasksCopy = JSON.parse(JSON.stringify(tasksMock));

        const newToDo = {
            "id": 3,
            "label": "Buy milk",
            "description": "Buy super fresh milk",
            "category": "house",
            "done": null
        }

        toDoServiceSpy.addToDo(newToDo).subscribe(response => {
            expect(tasksMock[tasksMock.length - 1]).toEqual(response);

            tasksMock = tasksCopy;
        });
    });

    it('should delete to-do', () => {
        toDoServiceSpy.deleteToDo(2).subscribe(() => {
            expect(tasksMock.length).toEqual(1);
        })
    });
});