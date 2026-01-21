import { z } from "../../../deps.ts";
import type {
	BodyMeta,
	CookieMeta,
	FormMeta,
	HeaderMeta,
	ParamMeta,
	QueryMeta,
	QueryModelMeta,
	StateMeta,
} from "./metadata.ts";

export const $Param = z.registry<ParamMeta>();
export const $QueryModel = z.registry<QueryModelMeta>();
export const $Query = z.registry<QueryMeta>();
export const $Form = z.registry<FormMeta>();
export const $Header = z.registry<HeaderMeta>();
export const $Cookie = z.registry<CookieMeta>();
export const $Body = z.registry<BodyMeta>();
export const $State = z.registry<StateMeta>();

export const ControllerRegistries = [
	$Param,
	$QueryModel,
	$Query,
	$Form,
	$Header,
	$Cookie,
	$Body,
	$State,
] as const;
