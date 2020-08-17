export const mutationTypes = {
    item_requested: 'item_requested',
    item_requested_succeeded: 'item_requested_succeeded',
    item_requested_failed: 'item_requested_failed',
    save_requested: 'save_requested',
    save_succeeded: 'save_succeeded',
    save_failed: 'save_failed',
    clean_form: 'clean_form',
    form_input_changed: 'form_input_changed',
}

export const formMutationTypesForScope = scope => ({
    item_requested: `${scope}_${mutationTypes.item_requested}`,
    item_requested_succeeded: `${scope}_${mutationTypes.item_requested_succeeded}`,
    item_requested_failed: `${scope}_${mutationTypes.item_requested_failed}`,
    save_requested: `${scope}_${mutationTypes.save_requested}`,
    save_succeeded: `${scope}_${mutationTypes.save_succeeded}`,
    save_failed: `${scope}_${mutationTypes.save_failed}`,
    clean_form: `${scope}_${mutationTypes.clean_form}`,
    form_input_changed: `${scope}_${mutationTypes.form_input_changed}`,
});

export const formMutationsForScope = scope => {
    const mutationTypes = formMutationTypesForScope(scope);
    return {
        itemRequested(state) {
            state.status = mutationTypes.item_requested
        },
        itemRequestedSucceeded(state, item) {
            state.status = mutationTypes.item_requested_succeeded;
            state.item = item;
        },
        itemRequestedFailed(state, error) {
            state.status = mutationTypes.item_requested_failed;
            state.error = error
        },
        saveRequested(state) {
            state.status = mutationTypes.save_requested;
        },
        saveSucceeded(state, item) {
            state.status = mutationTypes.save_succeeded;
            state.item = item;
        },
        saveFailed(state, error) {
            state.status = mutationTypes.save_failed;
            state.error = error
        },
        formInputChanged(state, {field, value}) {
            state.status = mutationTypes.form_input_changed;
            state.item[field] = value
        }
    }
};
