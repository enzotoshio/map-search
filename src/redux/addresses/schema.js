import { schema } from 'normalizr';

export const address = new schema.Entity('address', {}, { idAttribute: 'cep' });
