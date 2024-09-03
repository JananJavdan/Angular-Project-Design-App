import { Customer } from "./customer.model";
import { DesignManager } from "./DesignManager";

export interface Design {
name: any;
  id: number;
  title: string;         
  description: string;    
  imageUrl: string;       
  category: string;
  color: string;
  size: string;
  logo: string;
  text: string;
  logoPosition: string;
  font: string;
  customer: any;          
  designManager: any;     
  approved: boolean; 
 
  }
  