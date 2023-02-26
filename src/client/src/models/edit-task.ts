import { updateUrl } from 'api';
import { UnexpectedError } from 'common/errors';
import fetchJSON from 'common/fetch-json';
import { ApiTaskStatus, convertToTask, isApiTask, Task } from 'global-types';
import { MutationData } from 'hooks';

type EditTaskPayload = {
  task: Task;
  name: string;
  status: ApiTaskStatus;
};

async function editTask({ task, name, status }: EditTaskPayload): Promise<MutationData> {
  const result = await fetchJSON(updateUrl(task.id.toString()), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams([
      ['task', name],
      ['status', status],
    ]),
  });

  if (isApiTask(result)) {
    return [task, convertToTask(result)];
  }

  throw new UnexpectedError('Something went wrong');
}

export default editTask;
