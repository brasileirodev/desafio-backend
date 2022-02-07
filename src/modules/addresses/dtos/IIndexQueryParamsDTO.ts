import Address from '../infra/typeorm/entities/Address';

export default interface IIndexQueryParamsDTO {
  user_id: string;
  addressQueryInput: Address;
}
