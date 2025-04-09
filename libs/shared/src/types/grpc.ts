export interface DefaultRequest {
  query: { [key: string]: any } | undefined;
  params: { [key: string]: any } | undefined;
  body: { [key: string]: any } | undefined;
  headers: { [key: string]: any } | undefined;
}

export interface DefaultResponse {
  statusCode: number;
  message: string;
  errors: string[];
  data: { [key: string]: any } | undefined;
}
