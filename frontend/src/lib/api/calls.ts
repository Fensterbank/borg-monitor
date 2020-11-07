import { apiRoutes, ApiClient } from './api';

export const registerAccount = async (client: ApiClient, form: any) =>
  client.fetch(apiRoutes.register, {
    method: 'POST',
    body: JSON.stringify({
      username: form.name,
      email: form.mail,
      password: form.password,
    }),
  });

export const initiatePasswordReset = async (client: ApiClient, email: string) =>
  client.fetch(apiRoutes.forgotPassword, {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });

export const resetPassword = async (
  client: ApiClient,
  code: string,
  form: any,
) =>
  client.fetch(apiRoutes.resetPassword, {
    method: 'POST',
    body: JSON.stringify({
      code,
      password: form.password,
      passwordConfirmation: form.passwordConfirmation,
    }),
  });

export const updateUser = async (client: ApiClient, form: any, id: number) =>
  client.fetch(apiRoutes.user(id), {
    method: 'PUT',
    body: JSON.stringify({
      username: form.username,
      description: form.description,
      logo: form.logo,
    }),
  });

export const createPublication = async (client: ApiClient, form: any) =>
  client.fetch(apiRoutes.publications, {
    method: 'POST',
    body: JSON.stringify({
      name: form.name,
      description: form.description,
      interval: form.interval,
    }),
  });

export const createEdition = async (client: ApiClient, form: any) =>
  client.fetch(apiRoutes.editions, {
    method: 'POST',
    body: JSON.stringify({
      name: form.name,
      description: form.description,
      publicationDate: form.publicationDate,
      file: form.files,
    }),
  });
