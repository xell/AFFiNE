import { useEffect, useState } from 'react';
import { getWorkspaces, Workspace, User } from './mock-data/mock';

export function getActiveWorkspace(): Workspace {
  return JSON.parse(localStorage.getItem('affine-active-workspace') ?? '{}');
}

export const useTemporaryHelper = () => {
  const [workspaceMetaList, setWorkspaceMetaList] = useState<Workspace[]>(
    getWorkspaces()
  );
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(
    JSON.parse(localStorage.getItem('affine-active-workspace') ?? '{}')
  );
  const [user, setUser] = useState<User | null>(null);

  return {
    updateWorkspaceMeta: (workspaceId: string, workspaceData: Workspace) => {
      const workspacesMeta = getWorkspaces();
      const newWorkspacesMeta = workspacesMeta.map((workspace: Workspace) => {
        if (workspace.id === workspaceId) {
          workspaceData.name && (workspace.name = workspaceData.name);
          workspaceData.avatar && (workspace.avatar = workspaceData.avatar);
          return workspaceData;
        }
        return workspace;
      });
      localStorage.setItem(
        'affine-workspace',
        JSON.stringify(newWorkspacesMeta)
      );
      setWorkspaceMetaList(newWorkspacesMeta);
      if (workspaceId === currentWorkspace?.id) {
        setCurrentWorkspace(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newWorkspacesMeta.find(v => v.id === currentWorkspace.id)
        );
      }
    },
    createWorkspace: (workspaceName: string) => {
      const workspaceData = {
        name: workspaceName,
        id: 'workspace-' + Date.now(),
        isPublish: false,
        isLocal: true,
        avatar: '',
        type: 'local',
      } as Workspace;
      const workspacesMeta = getWorkspaces();
      workspacesMeta.push(workspaceData);
      localStorage.setItem('affine-workspace', JSON.stringify(workspacesMeta));
      setWorkspaceMetaList(workspacesMeta);
    },
    deleteWorkspace: (workspaceId: string) => {
      const workspacesMeta = getWorkspaces();
      const newWorkspacesMeta = workspacesMeta.filter(() => {
        return workspaceId !== workspaceId;
      });
      localStorage.setItem(
        'affine-workspace',
        JSON.stringify(newWorkspacesMeta)
      );
      setWorkspaceMetaList(workspacesMeta);
    },

    setWorkspacePublish: (id: string, isPublish: boolean) => {
      const workspacesMeta = getWorkspaces();
      const newWorkspacesMeta = workspacesMeta.map((workspace: Workspace) => {
        if (workspace.id === id) {
          workspace.isPublish = isPublish;
        }
        return workspace;
      });
      localStorage.setItem(
        'affine-workspace',
        JSON.stringify(newWorkspacesMeta)
      );
      setWorkspaceMetaList(workspacesMeta);
    },
    setActiveWorkspace(workspaceData: Workspace) {
      localStorage.setItem(
        'affine-active-workspace',
        JSON.stringify(workspaceData)
      );
      setCurrentWorkspace(workspaceData);
    },

    login: () => {
      const userInfo = {
        name: 'Diamond',
        id: 'ttt',
        email: 'diamond.shx@gmail.com',
        avatar: 'string',
      };
      localStorage.setItem('affine-user', JSON.stringify(userInfo));

      setUser(userInfo);
    },
    getUserInfo: () => {
      return user;
    },

    SignOut(): void {
      localStorage.removeItem('affine-user');
      setUser(null);
    },

    workspaceMetaList,
    currentWorkspace,
    user,
  };
};

export default useTemporaryHelper;