import Dayjs from 'dayjs';
import * as File from '@/models/file.model';

export const serialize = (_file: File.Front) => {
  const file: File.Api = {
    id: _file.id,
    name: _file.name || '',
    isActive: _file.isActive,
    fileType: _file.fileType,
    project: _file.project,
    description: _file.description,
  };

  return file;
};

export const deserialize = (resp: File.ApiResponse) => {
  const file: File.Front = {
    id: resp._id,
    name: resp.name,
    isActive: resp.isActive,
    fileHistories: resp.fileHistories,
    description: resp.description,
    fileType: resp.fileType,
    project: resp.project,
    createdById: resp.createdById,
    lastModifiedById: resp.lastModifiedById,
    createdAt: Dayjs(resp.createdAt).format('DD/MM/YYYY'),
    updatedAt: Dayjs(resp.updatedAt).format('DD/MM/YYYY'),
  };

  return file;
};
