import { RequestHandler } from "express";
import { IUser } from "../../models/User";

export type AppResponse<D = unknown> = {
  success: boolean;
  message?: string;
  data?: D;
};

type DefaultReqLocalData = {
  user: IUser;
  requestId: string;
};

export type AppRequestHandler<
  ResData = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string>,
  RouteParams = unknown
> = RequestHandler<
  RouteParams,
  AppResponse<ResData>,
  ReqBody,
  ReqQuery,
  DefaultReqLocalData
>;
