/**
 * HTTP methods supported by the router.
 */
export enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

/**
 * All supported HTTP method strings.
 */
export const HTTPMethods: string[] = [
    HTTPMethod.DELETE,
    HTTPMethod.GET,
    HTTPMethod.HEAD,
    HTTPMethod.OPTIONS,
    HTTPMethod.PATCH,
    HTTPMethod.POST,
    HTTPMethod.PUT,
];

/**
 * Wildcard symbol used to match any HTTP method.
 */
export const METHOD_WILDCARD = '*';

/**
 * Default path separator used in route definitions.
 */
export const PATH_SEPARATOR = '/';

/**
 * Regex pattern for matching route parameters (e.g. :id).
 */
export const ROUTE_PARAM_PATTERN = /:([a-zA-Z0-9_]+)/g;

/**
 * Regex pattern for matching wildcard segments in routes.
 */
export const ROUTE_WILDCARD_PATTERN = /\*/g;

/**
 * Symbol used to store router metadata on handler functions.
 */
export const ROUTER_META_KEY = Symbol('routup:meta');

/**
 * Symbol used to identify router instances.
 */
export const ROUTER_INSTANCE_KEY = Symbol('routup:router');

/**
 * Default layer options applied when none are provided.
 */
export const DEFAULT_LAYER_OPTIONS = {
    end: true,
    sensitive: false,
    strict: false,
} as const;

/**
 * Maximum number of redirects to follow before throwing.
 */
export const MAX_REDIRECTS = 10;

/**
 * Header name for the request ID.
 */
export const HEADER_REQUEST_ID = 'x-request-id';

/**
 * Header name for forwarded IP addresses.
 */
export const HEADER_FORWARDED_FOR = 'x-forwarded-for';
