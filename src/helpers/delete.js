export const mutationTypes = {
    delete_requested: 'delete_requested',
    delete_do_delete: 'delete_do_delete',
    delete_succeeded: 'delete_succeeded',
    delete_failed: 'delete_failed'
};

export const deleteMutationTypesForScope = scope => ({
    delete_requested: `${scope}_${mutationTypes.delete_requested}`,
    delete_do_delete: `${scope}_${mutationTypes.delete_do_delete}`,
    delete_succeeded: `${scope}_${mutationTypes.delete_succeeded}`,
    delete_failed: `${scope}_${mutationTypes.delete_failed}`
});

export const deleteMutationForScope = scope => {
    const mutationTypes = deleteMutationTypesForScope(scope);
    return {
        doDelete(state, selected){
            state.status = mutationTypes.delete_do_delete
            state.selected = selected
        },
        deleteRequested(state) {
            state.status = mutationTypes.delete_requested
        },
        deleteSucceeded(state) {
            state.status = mutationTypes.delete_succeeded;
            state.selected = null
        },
        deleteFailed(state, error) {
            state.status = mutationTypes.delete_failed;
            state.error = error
        },
    };
};
