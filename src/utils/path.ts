/**
 * Utility functions for route path manipulation and normalization.
 */

import { PATH_SEPARATOR } from '../constants';

/**
 * Normalize a path by ensuring it starts with a separator
 * and does not end with one (unless it is the root path).
 *
 * @param path - The path to normalize.
 * @returns The normalized path string.
 */
export function normalizePath(path: string): string {
    if (!path || path === PATH_SEPARATOR) {
        return PATH_SEPARATOR;
    }

    // Ensure path starts with separator
    let normalized = path.startsWith(PATH_SEPARATOR)
        ? path
        : `${PATH_SEPARATOR}${path}`;

    // Remove trailing separator
    if (normalized.length > 1 && normalized.endsWith(PATH_SEPARATOR)) {
        normalized = normalized.slice(0, -1);
    }

    return normalized;
}

/**
 * Join multiple path segments into a single normalized path.
 *
 * @param segments - Path segments to join.
 * @returns The joined and normalized path.
 */
export function joinPaths(...segments: string[]): string {
    if (segments.length === 0) {
        return PATH_SEPARATOR;
    }

    const joined = segments
        .filter((s) => s != null && s !== '')
        .join(PATH_SEPARATOR)
        .replace(/\/+/g, PATH_SEPARATOR);

    return normalizePath(joined);
}

/**
 * Check whether a given path matches a pattern, supporting
 * wildcard (`*`) and named parameters (`:param`).
 *
 * @param pattern - The route pattern to match against.
 * @param path - The actual request path.
 * @returns True if the path matches the pattern.
 */
export function matchPath(pattern: string, path: string): boolean {
    if (pattern === path) {
        return true;
    }

    if (pattern === '*' || pattern === '/*') {
        return true;
    }

    const patternParts = normalizePath(pattern).split(PATH_SEPARATOR).filter(Boolean);
    const pathParts = normalizePath(path).split(PATH_SEPARATOR).filter(Boolean);

    if (patternParts.length !== pathParts.length) {
        // Allow trailing wildcard to match remaining segments
        const lastPart = patternParts[patternParts.length - 1];
        if (lastPart !== '*') {
            return false;
        }
    }

    for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[i];

        if (patternPart === '*') {
            return true;
        }

        if (patternPart.startsWith(':')) {
            // Named parameter — matches any non-empty segment
            if (!pathPart) {
                return false;
            }
            continue;
        }

        if (patternPart !== pathPart) {
            return false;
        }
    }

    return true;
}

/**
 * Extract named parameter values from a path based on a pattern.
 *
 * @param pattern - The route pattern containing named parameters.
 * @param path - The actual request path.
 * @returns A record of parameter names to their extracted values.
 */
export function extractPathParams(
    pattern: string,
    path: string,
): Record<string, string> {
    const params: Record<string, string> = {};

    const patternParts = normalizePath(pattern).split(PATH_SEPARATOR).filter(Boolean);
    const pathParts = normalizePath(path).split(PATH_SEPARATOR).filter(Boolean);

    for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];

        if (patternPart.startsWith(':')) {
            const paramName = patternPart.slice(1);
            if (pathParts[i]) {
                params[paramName] = decodeURIComponent(pathParts[i]);
            }
        }
    }

    return params;
}
