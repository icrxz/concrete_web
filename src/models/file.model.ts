import * as FileHistory from './fileHistory.model';

export interface Front {
  id?: string;
 
  name?: string;
 
  fileType: string;

  fileHistories: Array<string>;

  description?: string;

  project: string;

  isActive: boolean;

  createdById?: string;

  lastModifiedById?: string;
  
  createdAt?: string;
  
  updatedAt?: string;
}
  
export interface Api {
  id?: string;
 
  name: string;

  fileType: string;
  
  project: string;

  isActive: boolean;
  
  description?: string;
}
  
export interface ApiResponse {
  isActive: boolean;
  
  fileHistories: Array<string>;
  
  _id: string;
  
  name?: string;
  
  fileType: string;
  
  description?: string;
  
  project: string;
  
  lastModifiedById: string;
  
  createdById: string;
  
  createdAt: string;
  
  updatedAt: string;
  
  __v: number;
}
