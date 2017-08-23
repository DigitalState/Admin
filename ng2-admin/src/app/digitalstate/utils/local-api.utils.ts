import isArray from 'lodash/isArray';

export class LocalApiUtils {

    /**
     * Generates a Router Link to an entity's `show` component from a URI.
     *
     * @param uri
     * @returns {{routerLink: Array, title: null}}
     */
    static createEntityLinkFromUri(uri: string): { routerLink: Array<string>, title: any } {
        if (uri) {
            const exploded = uri.split('/');

            if (isArray(exploded) && exploded.length >= 2) {
                let link = {
                    routerLink: [],
                    title: null,
                };

                const uuid = exploded[exploded.length - 1];
                const entityPrefix = exploded[exploded.length - 2];

                switch (entityPrefix) {
                    case 'scenarios':
                    case 'submissions':
                        link.routerLink = ['/pages', 'services', entityPrefix, uuid, 'show'];
                        break;
                    case 'case-statuses':
                        // @Todo Implement case statuses link by changing the route to the case-status component in a similar way to how scenarios are implemented
                        alert('Case Statuses link is not implemented yet.');
                        link.routerLink = ['/pages', 'cases', entityPrefix, uuid, 'show'];
                        break;
                    case 'individuals':
                    case 'staffs':
                    case 'anonymouses':
                        link.routerLink = ['/pages', 'identities', entityPrefix, uuid, 'show'];
                        break;
                    default:
                        link.routerLink = ['/pages', entityPrefix, uuid, 'show'];
                        break;
                }

                return link;
            }
        }
    }
}