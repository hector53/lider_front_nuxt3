export interface FEE_EXTRA_ {
  type: string;
  value: number;
}

export interface ProcessorSiteDomain {
  _id: string;

  site_id: string;
  processor_name: string;

  processor_identy: string; 

  processor_image: string;

  processor_fee: string;

  custom_fee: string;

  hosted: boolean;

  fee_extra: FEE_EXTRA_;

  active: boolean;
}

export interface ProcessorSite {
  _id: string;
  name: string;

  image: string;

  active: boolean;
}

export interface DomainsSelect {
  name: string;
  url: string;
  _id: string;
}

export interface usersSelect {
  fullName: string;
  _id: string;
}

export interface templateIndividualSelect {
  name: string;
  _id: string;
}
export interface templateMultipleSelect {
  name: string;
  _id: string;
}

export interface Site {
  _id?: string;

  site: string;

  nameStore: string;

  amounts?: string;
  fee_quantity: boolean;

  webhook: string;

  assigned_domain?: string;

  assigned_user?: string;

  template_individual?: string;

  template_multiple?: string;

  language?: string;

  success_url?: string;

  currency: string[];

  processorsSites: ProcessorSiteDomain[];

  active: boolean;

  created: string;

  public_key?: string;

  private_key?: string;
}

export interface SitePagination {
  sites: Site[];

  count: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  nextPage: number;

  previousPage: number;
}
