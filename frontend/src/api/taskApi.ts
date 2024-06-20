import { api } from './api';

export const getTasks = () => {
  return api.get('/')
    .then(({ data }) => data)
    .catch((error) => { throw error; });
};

export const createTask = (task: any) => {
  return api.post('/', task)
    .then(({ data }) => data)
    .catch((error) => { throw error; });
}

export const updateTask = (id: string, task: any) => {
  return api.put(`/${id}`, task)
    .then(({ data }) => data)
    .catch((error) => { throw error; });
}

export const deleteTask = (id: string) => {
  return api.delete(`/${id}`)
    .then(({ data }) => data)
    .catch((error) => { throw error; });
}
