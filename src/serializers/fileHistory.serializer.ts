import Dayjs from 'dayjs';
import * as FileHistory from '@/models/fileHistory.model';

export const deserialize = (resp: FileHistory.ApiResponse) => {
  const file: FileHistory.Front = {
    id: resp._id,
    externalURL: resp.externalURL,
    isActive: resp.isActive,
    file: resp.file,
    versionNumber: resp.versionNumber,
    createdById: resp.createdById,
    lastModifiedById: resp.lastModifiedById,
    createdAt: Dayjs(resp.createdAt).format('DD/MM/YYYY'),
    updatedAt: Dayjs(resp.updatedAt).format('DD/MM/YYYY'),
  };

  return file;
};
