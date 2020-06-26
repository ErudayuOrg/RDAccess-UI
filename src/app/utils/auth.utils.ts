import {HttpHeaders} from '@angular/common/http';

export const getHeader = ():any=>{
    let headers = new HttpHeaders({
        'content-type':'application/json',
        'Authorization': localStorage.getItem('TOKEN')
    })
    return {headers};
}