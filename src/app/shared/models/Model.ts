export interface Model<Id> {
  id: Id;
  status?: "creating" | "default";
}
