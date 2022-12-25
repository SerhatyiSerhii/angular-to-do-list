import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoItemFormComponent } from './components/to-do-item-form/to-do-item-form.component';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoItemFormComponent,
    ToDoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
