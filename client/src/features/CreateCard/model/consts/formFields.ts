interface InputFormFields {
    errorName: 'engWord' | 'ruWord' | 'example';
    placeholder: string;
}

export const getFormFields = () => {
    const formFields: InputFormFields[] = [
        { errorName: 'engWord', placeholder: 'Английский' },
        { errorName: 'ruWord', placeholder: 'Русский' },
        { errorName: 'example', placeholder: 'Пример использования' },
    ];

    return formFields
};
