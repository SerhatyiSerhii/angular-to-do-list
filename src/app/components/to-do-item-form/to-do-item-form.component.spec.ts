import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";
import { ToDoItemFormComponent } from "./to-do-item-form.component";

const testId = 1;
const tasksMock: ToDoItem[] = [
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
    getToDoListUpdated: () => of(tasksMock),
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
}

describe('ToDoItemFormComponent', () => {
    let fixture: ComponentFixture<ToDoItemFormComponent>;
    let component: ToDoItemFormComponent;
    const routerSpy = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({id: testId})
                    }
                },
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
                ToDoItemFormComponent
            ]
        });

        fixture = TestBed.createComponent(ToDoItemFormComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should get id from url on NgOnInit method call', () => {
        spyOn<any>(component['toDoService'], 'getToDoById').and.callThrough();

        component.ngOnInit();

        expect(component.toDoId).toEqual(testId);
        expect(component['toDoService'].getToDoById).toHaveBeenCalled();
    });
});