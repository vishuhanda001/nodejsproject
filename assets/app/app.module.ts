
import {DatabaseService} from './services/databaseservice';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';


import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers:[DatabaseService],
    imports: [BrowserModule,HttpModule,ReactiveFormsModule,FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}