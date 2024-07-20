import { Model } from './models/Model';

export type PartialModel<M extends Model<unknown>> = Partial<M> & {
  id: M['id'];
};
