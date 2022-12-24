import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoItemFormComponent } from './to-do-list/components/to-do-item/to-do-item-form.component';
import { ToDoListComponent } from './to-do-list/components/to-do-list/to-do-list.component';


const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
  },
  {
    path: ':id',
    component: ToDoItemFormComponent
  },
  {
    path: '/add-to-do',
    component: ToDoItemFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
