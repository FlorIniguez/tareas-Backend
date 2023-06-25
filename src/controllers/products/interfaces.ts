import { Categories } from "../../models/Product";

//DTO data transfer object, contrato del objeto q se va a transferir
export interface AddProductDTO {
    name: string;
    price: number;
    category: Categories
}

//copia de la api de dolar, los tipos que hay y les asigno que son tipo number
export interface APIDolar {
    oficial: number
    solidario: number
    blue: number
    ccb: number
    mep: number
    ccl: number
    mepgd30: number
    cclgd30: number
    blue_bid: number
    qatar: number
    mep_var: number
    ccl_var: number
    ccb_var: number
    blue_var: number
    time: number
  }
  