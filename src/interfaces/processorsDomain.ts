export interface ProcessorsDomain {
  _id?: string;
  domain_id: string;
  processor_id: string;
  public_key: string;
  private_key: string;
  active: boolean;
  processor_name: string;
  processor_image: string;
}
