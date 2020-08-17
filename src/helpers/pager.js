export const mutationTypes = {
    pagination_changed: 'pagination_changed',
    reset_paging: 'pagination_reset',
}

export const pagerMutationTypesForScope = scope => ({
    page_changed: `${scope}_${mutationTypes.pagination_changed}`,
    reset_paging: `${scope}_${mutationTypes.reset_paging}`,
});

export const pagerMutationsForScope = scope => {
    const mutationTypes = pagerMutationTypesForScope(scope);
    return {
        paginationChanged(state, pagination) {
            state.status = mutationTypes.pagination_changed
            state.pagination = pagination
        },
        paginationReset(state) {
            state.status = mutationTypes.reset_paging;
            state.pagination = {
                page : 1,
                itemsPerPage: 5,
                totalItems: 0,
                sortBy: ['id'],
                sortDesc: [false],
            }
        }
    }
};
