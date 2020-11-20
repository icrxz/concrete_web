export interface Front {
  id?: string;
 
  name: string;
 
  isActive: boolean;
  
  organization: string;
  
  description?: string;
  
  manager: string;
  
  files: Array<string>;
  
  createdAt?: string;
  
  updatedAt?: string;
}
  
export interface Api {
  id?: string;
 
  name: string;
  
  isActive: boolean;
  
  organization: string;
  
  description?: string;
  
  manager: string;
  
  files: Array<string>;
}
  
export interface ApiResponse {
  projectUsers: Array<Record<string, unknown>>;
  _id: string;
  name: string;
  isActive: boolean;
  organization: string;
  description: string;
  manager: string;
  files: Array<string>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
