import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FilterOption } from 'components/TaskListFilter';
import { apiStatusMap, Task } from 'global-types';
import _, { curry } from 'lodash';
import addTask from 'models/add-task';
import deleteTask from 'models/delete-task';
import editTask from 'models/edit-task';
import getAllTasks from 'models/get-all-tasks';
import { useState } from 'react';

type QueryKey = ['tasks', FilterOption];
type Data = Task[] | undefined;
type NewValue = Task | null;
type PreviousValue = Task | null;
type MutationData = [PreviousValue, NewValue];

function getQueryKey(filter: FilterOption): QueryKey {
  return ['tasks', filter];
}
function getQueryKeys(filter: FilterOption[]): QueryKey[] {
  return filter.map(getQueryKey);
}

function getTasksHandler(filter: FilterOption) {
  return function () {
    return filter === 'all' ? getAllTasks() : getAllTasks(apiStatusMap.get(filter));
  };
}
function addTaskHandler(oldData: Data, newTask: Task): Data {
  return oldData ? oldData.concat(newTask) : oldData;
}
function deleteTaskHandler(oldData: Data, deleteTask: Task): Data {
  if (oldData == null) {
    return oldData;
  }

  const index = oldData.findIndex((task) => task.id === deleteTask.id);

  if (index < 0) {
    return oldData;
  }

  return oldData.slice(0, index).concat(oldData.slice(index + 1));
}
function editTaskHandler(oldData: Data, newTask: Task): Data {
  if (oldData == null) {
    return oldData;
  }

  return oldData.map((task) => (task.id === newTask.id ? newTask : task));
}

const curryAddTaskHandler = curry(addTaskHandler);
const curryDeleteTaskHandler = curry(deleteTaskHandler);
const curryEditTaskHandler = curry(editTaskHandler);

type ChangeFilterHandler = (filter: FilterOption) => void;

function useGetTasks(): [UseQueryResult<Task[], unknown>, FilterOption, ChangeFilterHandler] {
  const [filter, setFilter] = useState<FilterOption>('all');
  const changeFilter: ChangeFilterHandler = (filter) => {
    setFilter(filter);
  };
  const result = useQuery(getQueryKey(filter), getTasksHandler(filter));
  return [result, filter, changeFilter];
}
function useAddTask() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onSuccess: ([, newTask]) => {
      if (newTask != null) {
        const updatedKeys = getQueryKeys(['all', newTask.status]);
        const handler = curryAddTaskHandler(_, newTask);
        updatedKeys.forEach((queryKey) => client.setQueryData<Task[]>(queryKey, handler));
      }
    },
  });
}
function useDeleteTask() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: ([previousTask]) => {
      if (previousTask != null) {
        const updatedKeys = getQueryKeys(['all', previousTask.status]);
        const handler = curryDeleteTaskHandler(_, previousTask);
        updatedKeys.forEach((queryKey) => client.setQueryData<Task[]>(queryKey, handler));
      }
    },
  });
}
function useEditTask() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: editTask,
    onSuccess: ([previousTask, newTask]) => {
      if (newTask != null && previousTask != null) {
        const editKey = getQueryKey('all');
        const deleteKey = getQueryKey(previousTask.status);
        const addKey = getQueryKey(newTask.status);

        const editHandler = curryEditTaskHandler(_, newTask);
        const deleteHandler = curryDeleteTaskHandler(_, previousTask);
        const addHandler = curryAddTaskHandler(_, newTask);

        client.setQueryData<Task[]>(editKey, editHandler);
        client.setQueryData<Task[]>(deleteKey, deleteHandler);
        client.setQueryData<Task[]>(addKey, addHandler);
      }
    },
  });
}

export { useGetTasks, useAddTask, useDeleteTask, useEditTask };
export type { ChangeFilterHandler, MutationData };
