import { Request, Response } from 'express';
import {
  CreateClientInput,
  UpdateClientInput,
  DeleteClientInput,
  GetClientInput,
} from '../schema/client.schema';
import {
  createClient,
  deleteClient,
  getAndUpdateClient,
  getClient,
  getClients,
} from '../services/client.service';

export async function createClientController(
  req: Request<{}, {}, CreateClientInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const client = await createClient({ ...body, user: userId });

  return res.send(client);
}

export async function updateClientController(
  req: Request<UpdateClientInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const clientId = req.params.clientId;
  const update = req.body;

  const client = await getClient({ _id: clientId });

  if (!client) {
    return res.sendStatus(404);
  }

  if (String(client.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedClient = await getAndUpdateClient({ _id: clientId }, update, {
    new: true,
  });

  return res.send(updatedClient);
}

export async function getClientController(
  req: Request<GetClientInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const clientId = req.params.clientId;
  const client = await getClient({ _id: clientId });

  if (!client) {
    return res.sendStatus(404);
  }

  if (String(client.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(client);
}

export async function getClientsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const clients = await getClients({ user: userId });

  if (!clients) {
    return res.sendStatus(404);
  }

  return res.send(clients);
}

export async function deleteClientController(
  req: Request<DeleteClientInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const clientId = req.params.clientId;

  const client = await getClient({ _id: clientId });

  if (!client) {
    return res.sendStatus(404);
  }

  if (String(client.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteClient({ _id: clientId });

  return res.sendStatus(200);
}
