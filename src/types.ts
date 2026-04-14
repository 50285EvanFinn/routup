/**
 * Core type definitions for routup.
 * These types form the foundation of the routing system.
 */

import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Extended HTTP request with routup-specific properties.
 */
export interface Request extends IncomingMessage {
    /**
     * Parsed URL parameters from route patterns (e.g., /users/:id)
     */
    params: Record<string, string>;

    /**
     * Parsed query string parameters
     */
    query: Record<string, string | string[]>;

    /**
     * Matched route path pattern
     */
    routePath?: string;

    /**
     * Base URL prefix stripped before matching
     */
    baseUrl: string;

    /**
     * The path portion of the URL, without query string
     */
    path: string;
}

/**
 * Extended HTTP response with routup-specific helper methods.
 */
export interface Response extends ServerResponse {
    /**
     * Whether the response has been sent
     */
    headersSent: boolean;
}

/**
 * Next function to pass control to the next handler in the chain.
 * Optionally accepts an error to trigger error handling.
 */
export type Next = (err?: Error | unknown) => void;

/**
 * Standard request handler function.
 */
export type Handler = (
    req: Request,
    res: Response,
    next: Next,
) => void | Promise<void>;

/**
 * Error handler function — receives an error as the first argument.
 */
export type ErrorHandler = (
    err: Error | unknown,
    req: Request,
    res: Response,
    next: Next,
) => void | Promise<void>;

/**
 * Union of all handler types accepted by the router.
 */
export type AnyHandler = Handler | ErrorHandler;

/**
 * Supported HTTP methods.
 */
export type HTTPMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT'
    | 'TRACE';

/**
 * A registered route layer, combining a path pattern with one or more handlers.
 */
export interface Layer {
    /**
     * The path pattern for this layer (e.g., '/users/:id' or '*').
     * Undefined means the layer matches all paths (middleware).
     */
    path: string | undefined;

    /**
     * HTTP method this layer responds to.
     * Undefined means the layer matches all methods (middleware).
     */
    method: HTTPMethod | undefined;

    /**
     * Ordered list of handlers to execute when this layer matches.
     */
    handlers: AnyHandler[];

    /**
     * Whether this layer is a router-level middleware mount.
     */
    isRouter: boolean;
}

/**
 * Options accepted when creating a new Router instance.
 */
export interface RouterOptions {
    /**
     * Enable case-sensitive route matching.
     * @default false
     */
    caseSensitive?: boolean;

    /**
     * Enable strict trailing-slash matching.
     * @default false
     */
    strict?: boolean;
}
