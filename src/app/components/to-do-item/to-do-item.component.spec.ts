import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";
import { ToDoItemComponent } from "./to-do-item.component";

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


describe('ToDoItemComponent', () => {
    let fixture: ComponentFixture<ToDoItemComponent>;
    let component: ToDoItemComponent;
    const routerSpy = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ToDoService,
                    useValue: ToDoServiceMock
                },
                {
                    provide: Router,
                    useValue: routerSpy
                }
            ],
            declarations: [
                ToDoItemComponent
            ]
        });

        fixture = TestBed.createComponent(ToDoItemComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should call navigate method on editToDo method call', () => {
        const toDo = tasksMock[0];

        component.editToDo(toDo);

        expect(routerSpy.navigate).toHaveBeenCalled();
    });

    it('should call deleteToDo method on deleteToDoItem method call', () => {
        spyOn<any>(component['toDoService'], 'deleteToDo').and.callThrough();

        component.deleteToDoItem(2);

        expect(component['toDoService'].deleteToDo).toHaveBeenCalled();
    });
});