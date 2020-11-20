export interface Front {
    id?: string;
   
    name: string;
   
    isActive: boolean;
    
    description?: string;

    projects: Array<string>;
    
    createdById?: string;

    lastModifiedById?: string;
    
    createdAt?: string;
    
    updatedAt?: string;
  }
    
  export interface Api {
    id?: string;
   
    name: string;
    
    isActive: boolean;
    
    description?: string;
    
    projects: Array<string>;
  }
    
  export interface ApiResponse {
    projects: Array<string>;
    _id: string;
    name: string;
    isActive: boolean;
    description: string;
    createdById: string;
    lastModifiedById: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  