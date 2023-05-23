export interface Template {
    _id?: string;
  
    name: string;
  
    type: number;
  
    html: string;
  }
export interface TemplatePagination {
    templates: Template[];
  
    count: number;
  
    totalPages: number;
  
    hasNextPage: boolean;
  
    hasPreviousPage: boolean;
  
    nextPage: number;
  
    previousPage: number;
  }
  