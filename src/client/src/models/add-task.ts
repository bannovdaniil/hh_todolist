import { addUrl } from 'api';
import { UnexpectedError } from 'common/errors';
import fetchJSON from 'common/fetch-json';
import { convertToTask, isApiTask } from 'global-types';
import { MutationData } from 'hooks';

async function addTask(taskName: string): Promise<MutationData> {
  const result = await fetchJSON(addUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams([['task', taskName]]),
  });

  if (isApiTask(result)) {
    return [null, convertToTask(result)];
  }

  throw new UnexpectedError('Something went wrong');
}

export default addTask;
