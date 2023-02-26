import { deleteUrl } from 'api';
import fetchJSON from 'common/fetch-json';
import { Task } from 'global-types';
import { MutationData } from 'hooks';

async function deleteTask(task: Task): Promise<MutationData> {
  await fetchJSON(deleteUrl(task.id.toString()), {
    method: 'DELETE',
  });
  return [task, null];
}

export default deleteTask;
