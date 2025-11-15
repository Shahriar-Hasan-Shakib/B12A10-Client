// #CRUD: Create operation - Add new AI model to inventory
// #PRIVATE_ROUTE: Requires authentication to access
import { ModelForm } from '@src/components/features';

export const AddModel = () => {
    return (
        <div>
            {/* #FORM: Reusable form component for model creation */}
            <ModelForm />
        </div>
    );
};
