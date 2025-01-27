interface ICategory {
    _id?: string;
    name: string;
    description: string;
    icon: string;
};

interface ICategoryForm extends ICategory {
    icon: FileList | string;
};

export type { ICategory, ICategoryForm };