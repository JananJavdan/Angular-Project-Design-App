import { Design } from "./design.model";
import { User } from "./user.model";

export interface Order {
userPhotoUrl: any;
productName: any;
description: any;
orderDate: string|number|Date;
price: string|number;
  id: number;
  customer_id: number;
  design_id: number;
  order_manager_id: number;
  quantity: number;
  status: string;
  total_price: number;
  productImages: string[];
 
}