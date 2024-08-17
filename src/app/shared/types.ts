import { Model } from './models/model';

export type PartialModel<M extends Model<unknown>> = Partial<M> & {
  id: M['id'];
};
