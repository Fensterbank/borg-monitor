export interface ApiResult<TResult = any, TError = ApiError> {
  data?: TResult;
  error?: TError;
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
}

export interface PagedResult<T> {
  items: T[];
  itemCount: number;
  total: number;
  pageCount: number;
}

export interface StrapiError {
  id: string;
  message: string;
}

export interface Backup {
  id: string;
  name: string;
  repo: string;
  borg: string;
  script: string;
  stats?: string;
  finished_at?: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface AuthInfo {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  firstName: string;
  lastName: string;
  created_at: string;
  updated_at: string;
  description: string;
  logo: any;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}
