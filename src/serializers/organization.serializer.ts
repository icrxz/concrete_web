import Dayjs from 'dayjs';
import * as Organization from '@/models/organization.model';

export const serialize = (_organization: Organization.Front) => {
  const organization: Organization.Api = {
    id: _organization.id,
    name: _organization.name,
    isActive: _organization.isActive,
    description: _organization.description,
    projects: _organization.projects,
  };

  return organization;
};

export const deserialize = (resp: Organization.ApiResponse) => {
  const organization: Organization.Front = {
    id: resp._id,
    name: resp.name,
    isActive: resp.isActive,
    projects: resp.projects,
    description: resp.description,
    createdById: resp.createdById,
    lastModifiedById: resp.lastModifiedById,
    createdAt: Dayjs(resp.createdAt).format('DD/MM/YYYY'),
    updatedAt: Dayjs(resp.updatedAt).format('DD/MM/YYYY'),
  };

  return organization;
};
