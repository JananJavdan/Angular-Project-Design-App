import { Customer } from "./customer.model";
import { DesignManager } from "./DesignManager";

export interface Design {
  id: number;
  name: string;
  category?: string;
  color?: string;
  size?: string;
  logo?: string;
  text: string;
  logoPosition: string;
  font: string;
  customer: Customer | null;
  designManager: DesignManager | null;
  approved: boolean;
  }
  