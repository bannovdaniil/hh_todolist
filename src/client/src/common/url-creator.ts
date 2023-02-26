import { curry } from 'lodash';

type PathParam = string;
type QueryKey = string;
type QueryValue = string;
type Query = Array<[QueryKey, QueryValue]>;

function urlCreator(baseUrl: string, path: string | null, param: PathParam | null, query: Query | null): string {
  function getPath(path: string | null, param: PathParam | null): string {
    if (path != null && param != null) {
      return [path, param].join('/');
    }
    if (path != null) {
      return path;
    }
    if (param != null) {
      return param;
    }
    return '';
  }

  const url = new URL(getPath(path, param), baseUrl);

  if (query != null) {
    url.search = new URLSearchParams(query).toString();
  }

  return url.toString();
}

const carryUrlCreator = curry(urlCreator);

export default carryUrlCreator;
export { urlCreator };
