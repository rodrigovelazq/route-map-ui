import {
    pagerMutationsForScope,
    pagerMutationTypesForScope
} from './pager';
import {
    itemsMutationsForScope,
    itemsMutationTypesForScope
} from './items';

export const dataTableMutationTypesForScope = scope => ({
    ...pagerMutationTypesForScope(scope),
    ...itemsMutationTypesForScope(scope),
});

export const dataTableMutationsForScope = scope => ({
    ...pagerMutationsForScope(scope),
    ...itemsMutationsForScope(scope),
});
