type TaskStatus = 'active' | 'done' | 'work';
const API_TASK_STATUS = ['ACTIVE', 'COMPLETED', 'WORK'] as const;
type ApiTaskStatus = (typeof API_TASK_STATUS)[number];

type Task = {
  id: number;
  time: string;
  name: string;
  status: TaskStatus;
};
type TaskAction = (id: number) => void;
type ApiTask = {
  id: number;
  taskTime: string;
  taskName: string;
  taskStatus: ApiTaskStatus;
};

function isApiTaskStatus(value: unknown): value is ApiTaskStatus {
  return API_TASK_STATUS.includes(value as ApiTaskStatus);
}
function isApiTask(value: unknown): value is ApiTask {
  return (
    typeof value === 'object' &&
    value != null &&
    typeof Reflect.get(value, 'id') === 'number' &&
    typeof Reflect.get(value, 'taskTime') === 'string' &&
    typeof Reflect.get(value, 'taskName') === 'string' &&
    isApiTaskStatus(Reflect.get(value, 'taskStatus'))
  );
}
function isArrayApiTask(value: unknown): value is ApiTask[] {
  return Array.isArray(value) && value.every(isApiTask);
}

const statusMap = new Map<ApiTaskStatus, TaskStatus>([
  ['ACTIVE', 'active'],
  ['COMPLETED', 'done'],
  ['WORK', 'work'],
]);
const apiStatusMap = new Map<TaskStatus, ApiTaskStatus>([
  ['active', 'ACTIVE'],
  ['done', 'COMPLETED'],
  ['work', 'WORK'],
]);

function convertToTask({ id, taskTime, taskName, taskStatus }: ApiTask): Task {
  return {
    id,
    time: new Intl.DateTimeFormat().format(new Date(taskTime)),
    name: taskName,
    status: statusMap.get(taskStatus) as TaskStatus,
  };
}

type FilterOption = 'all' | TaskStatus;
const FILTER_OPTIONS: FilterOption[] = ['all', 'active', 'done', 'work'];

function isFilterOption(value: unknown): value is FilterOption {
  return FILTER_OPTIONS.includes(value as FilterOption);
}

export {
  statusMap,
  apiStatusMap,
  convertToTask,
  isApiTask,
  isArrayApiTask,
  isApiTaskStatus,
  isFilterOption,
  FILTER_OPTIONS,
};
export type { Task, TaskStatus, ApiTask, TaskAction, ApiTaskStatus, FilterOption };
