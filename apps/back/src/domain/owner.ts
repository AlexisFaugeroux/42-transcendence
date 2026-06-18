export type OwnerType = 'PLATEFORM' | 'USER';

export interface Owner {
  id: string;
  type: OwnerType;
}
