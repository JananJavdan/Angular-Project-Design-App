import { Design } from "./design.model";
import { User } from "./user.model";

export interface Order {
  id: number;
  productName: string;
  description: string;
  price: string | number; 
  quantity: number;
  orderDate: Date | string; 
  status: string;
  productImages: string[];
  userPhotoUrl: string;
  customer_id: number;
  design_id: number;
  order_manager_id: number;
  total_price: number;
 
}