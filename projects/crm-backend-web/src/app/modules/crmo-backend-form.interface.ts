interface CrmoBackendForm {
    /**
     * Initialize
     */
    fnInitialize(): void;


    /**
     * Save Data
     */
    fnSaveAction(): boolean;


    /**
     * Load form data
     */
    fnLoadData(): void;


    /**
     * Reset form
     */
    fnResetForm(): void;


    /**
     * Initialize Reactive Form
     */
    fnInitializeForm(): void;
}