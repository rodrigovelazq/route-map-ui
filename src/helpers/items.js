export const mutationTypes = {
    data_requested: 'data_requested',
    data_request_succeeded: 'data_request_succeeded',
    data_request_failed: 'data_request_failed',
};

export const itemsMutationTypesForScope = scope => ({
    data_requested: `${scope}_${mutationTypes.data_requested}`,
    data_request_succeeded: `${scope}_${mutationTypes.data_request_succeeded}`,
    data_request_failed: `${scope}_${mutationTypes.data_request_failed}`,
});

export const itemsMutationsForScope = scope => {
    const mutationTypes = itemsMutationTypesForScope(scope);
    return {
        dataRequested(state) {
            state.status = mutationTypes.data_requested
        },
        dataRequestedSucceeded(state, data) {
            state.status = mutationTypes.data_request_succeeded,
            state.data = data
        },
        dataRequestedFailed(state, error) {
            state.status = mutationTypes.data_request_failed
            state.error = error
        },
    };
};
