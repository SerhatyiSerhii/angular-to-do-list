import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToDoItem } from "src/app/models/to-do-item";
import { ToDoService } from "src/app/services/to-do.service";

@Component({
    selector: 'to-do-item-form',
    templateUrl: './to-do-item-form.component.html',
    styleUrls: ['./to-do-item-form.component.scss']
})
export class ToDoItemFormComponent implements OnInit {
    toDoId: number;
    toDoForm: FormGroup;
    toDoFields: {
        name: keyof ToDoItem,
        title: string,
    }[] = [
            { name: 'label', title: 'Label' },
            { name: 'description', title: 'Description' },
            { name: 'category', title: 'Category' },
        ];

    private toDo: ToDoItem;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toDoService: ToDoService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(data => {
            this.toDoId = Number(data.id);

            this.toDoForm = new FormGroup({
                label: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
                category: new FormControl('', Validators.required),
            })
        });

        if (this.toDoId) {
            this.toDoService.getToDoById(this.toDoId).subscribe(
                data => {
                    this.toDo = data;
                    const form = { ...data };

                    delete form.id;
                    delete form.done;

                    for (let [key, value] of Object.entries(form)) {
                        this.toDoForm.controls[key].setValue(value)
                    }
                },
                () => this.router.navigate(['']),
            );
        }
    }

    updateToDo(): void {
        const updatedTodo = new ToDoItem(
            this.toDoForm.controls.label.value,
            this.toDoForm.controls.description.value,
            this.toDoForm.controls.category.value,
            this.toDo?.done || null
        );

        if (this.toDoId) {
            this.toDoService.updateToDo(this.toDoId, updatedTodo).subscribe(() => {
                this.router.navigate(['']);
            });
        } else {
            this.toDoService.addToDo(updatedTodo).subscribe(() => {
                this.router.navigate(['']);
            });
        }
    }

    cancelUpdate(): void {
        this.router.navigate(['']);
    }
}