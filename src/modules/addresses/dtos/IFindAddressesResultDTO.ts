export default interface IFindAddressResultDTO {
  id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  complement_address: string;
  created_at: Date;
  updated_at: Date;
}
