import { DatabaseService } from './services/databaseservice';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';


var name: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    
    datasfromposgres: string[];
    searcheddata: any;
    bysearchid: boolean;
    Postform: FormGroup;
    postformcontrols: any;
    constructor(private databaseService: DatabaseService, private fb: FormBuilder) {
        this.Postform = fb.group({
            'name': ['', Validators.required],
            'rollno': ['', Validators.required],
            'direction': ['', Validators.required]
        })
    }

    onSubmit() {

        this.postformcontrols = this.Postform.controls;
        console.log(this.postformcontrols.name.value);
        console.log(this.postformcontrols.rollno.value);
        console.log(this.postformcontrols.direction.value);
        this.databaseService.postdataintodb(this.postformcontrols.name.value,
            this.postformcontrols.rollno.value,
            this.postformcontrols.direction.value).subscribe((data) => {
                // console.log("data"+data);
                this.datasfromposgres = data;

            })

            
    }


    ngOnInit() {

        this.databaseService.getdatafromdb().subscribe((data) => {
            console.log(data)
            this.datasfromposgres = data;
        });

    }

    searchbyid(id) {

        console.log(id);
        this.databaseService.searchinDB(id).subscribe((data) => {
            this.searcheddata = data;
            console.log("searched data->" + JSON.stringify(this.searcheddata[0].id));

        });

    }


    updatebyid(id, name, rollno, direction) {
        console.log(id, name, rollno, direction);
        this.databaseService.updateinDb(id, name, rollno, direction)
            .subscribe((data) => {
                console.log(data);
                this.datasfromposgres = data;
            }, (error) => {
                console.error("error:-> " + error)
            }, () => { console.log("completed") });


    }






}