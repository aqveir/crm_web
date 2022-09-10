import { Observable } from "rxjs";

export interface IBaseInterface {
   
    /**
     * Get All the records for the entity
     */
    get(_params: Object):  Observable<any>;


    /**
     * Get record by identifier
     */
    getByHash(_hash: string, _params:Object): Observable<any>;

}