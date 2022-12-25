import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";
import { ToDoListComponent } from "./to-do-list.component";

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
}

describe('ToDoListComponent', () => {
    let fixture: ComponentFixture<ToDoListComponent>;
    let component: ToDoListComponent;
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
                ToDoListComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoListComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate on addToDoItem method call', () => {
        component.addToDoItem();

        expect(routerSpy.navigate).toHaveBeenCalled();
    });

    it('should call getToDos method on ngOnInit call', () => {
        spyOn<any>(component['toDoService'], 'getToDos').and.callThrough();

        component.ngOnInit();

        expect(component['toDoService'].getToDos).toHaveBeenCalled();
    })
});