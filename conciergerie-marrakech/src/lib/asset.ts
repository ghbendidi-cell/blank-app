/**
 * Resolves a public/ asset path against the app's actual base URL
 * (import.meta.env.BASE_URL — "/" in dev, "/blank-app/" in production).
 *
 * A plain relative path like "images/foo.jpg" only resolves correctly from
 * the site root; once a page is reached at a nested route (e.g.
 * /services/menage-linge, whether via client-side navigation or a direct
 * page load), the browser resolves relative URLs against that deeper path
 * instead. Always use this helper for anything in public/ so it works the
 * same regardless of which route rendered it.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
