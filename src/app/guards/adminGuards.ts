import { CanActivateFn } from "@angular/router";

export function AdminGuard():CanActivateFn{
    // let role = "admin"
    
    return ()=>{
        let role = localStorage.getItem('role') 
        if(role == "admin"){
            console.log("admin")
            return true;
        } 
        else{
            alert("Sorry no access")
            return false;
         }
        
    }
}