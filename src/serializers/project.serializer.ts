import * as Project from '@/models/project.model';

export const serialize = (_project: Project.Front) => {
  const project: Project.Api = {
    id: _project.id,
    name: _project.name,
    isActive: _project.isActive,
    organization: _project.organization,
    description: _project.description,
    manager: _project.manager,
    files: _project.files,
  };

  return project;
};

export const deserialize = (resp: Project.ApiResponse) => {
  const project: Project.Front = {
    id: resp._id,
    name: resp.name,
    isActive: resp.isActive,
    manager: resp.manager,
    organization: resp.organization,
    files: resp.files,
    description: resp.description,
    createdAt: resp.createdAt,
    updatedAt: resp.updatedAt,
  };

  return project;
};
