import * as FileHistory from '@/models/fileHistory.model';

export const InitialFrontState: FileHistory.Front = {
  id: '',
  externalURL: '',
  file: '',
  isActive: true,
  versionNumber: 0,
  createdById: '',
  lastModifiedById: '',
  createdAt: '',
  updatedAt: '',
};
