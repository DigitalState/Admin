import { Pager } from './pager';
/**
 * An object used to hold API query parameters
 */
export class ListQuery {
    path: string;
    public pager: Pager = new Pager();
    filters: object = {};

    constructor(path: string) {
        this.path = path;
    }

    withFilter(filter): ListQuery {
        this.filters = filter;
        return this;
    }

    withPager(pager): ListQuery {
        this.pager = pager;
        return this;
    }

    buildParameters() {
        let params = {};

        if (this.pager) {
            Object.assign(params, {
                page: this.pager.pageNumber + 1, // the API page numbering starts from page one (1).
                itemsPerPage: this.pager.size
            });
        }

        if (this.filters) {
            Object.assign(params, this.filters);
        }

        return params;
    }
}
