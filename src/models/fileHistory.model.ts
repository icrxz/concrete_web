export interface Front {
  id: string;
  versionNumber: number;
  isActive: boolean;
  externalURL: string;
  file: string;
  createdById: string;
  lastModifiedById: string;
  createdAt: string;
  updatedAt: string;
}
  
export interface ApiResponse {
  versionNumber: number;
  isActive: boolean;
  _id: string;
  externalURL: string;
  lastModifiedById: string;
  createdById: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
