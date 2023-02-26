import { BadRequestError, NotFoundError, UnexpectedError } from 'common/errors';

async function fetchJSON(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, init);

  if (response.status === 204) {
    return;
  }
  if (response.ok) {
    const result: unknown = await response.json();
    return result;
  }
  if (response.status === 400) {
    throw new BadRequestError('Bad request');
  }
  if (response.status === 404) {
    throw new NotFoundError('Not found');
  }
  throw new UnexpectedError('Something went wrong');
}

export default fetchJSON;
