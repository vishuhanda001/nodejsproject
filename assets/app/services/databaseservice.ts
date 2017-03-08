import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DatabaseService{


constructor(private http:Http){}

getdatafromdb(){
   return this.http.get("http://localhost:3000/user").map((response:Response)=>{
        
        return response.json();
    })
}

postdataintodb(name:string,rollno:string,direction:string){
    console.log(name+"--"+rollno+"--"+direction);
    var body = JSON.stringify({"name":name,"rollno":rollno,"direction":direction});
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    debugger;
    console.log(body);
    return this.http.post("http://localhost:3000/user",body,{headers:headers}).map((response:Response)=>{
        
        return response.json();
    })
}

searchinDB(id){
    return this.http.get("http://localhost:3000/user/"+id).map((res:Response)=>{
            console.log("---> "+res.json());
                return res.json();
    })
}

updateinDb(id,name,rollno,direction){
    var body = JSON.stringify({"id":id,"name":name,"rollno":rollno,"direction":direction});
    var headers = new Headers();
    headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/user',body,{headers:headers}).map((res)=>{
        return res.json();
    })
}

}