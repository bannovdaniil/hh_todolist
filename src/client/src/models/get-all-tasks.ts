import { getAllUrl } from 'api';
import { UnexpectedError } from 'common/errors';
import fetchJSON from 'common/fetch-json';
import { ApiTaskStatus, isArrayApiTask, convertToTask, Task } from 'global-types';

async function getAllTasks(status?: ApiTaskStatus): Promise<Task[]> {
  const url = getAllUrl(status != null ? [['status', status]] : null);
  const result = await fetchJSON(url);

  if (isArrayApiTask(result)) {
    return result.map(convertToTask);
  }

  throw new UnexpectedError('Something went wrong');
}

export default getAllTasks;
