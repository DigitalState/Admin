
export const MICROSERVICES = {
    'services': {
        label: 'Services',
        entrypoint: {
            url: 'http://localhost:8014/',
        },
        properties: {
            'title': {
                label: 'Title',
                type: 'string',
                validation: {
                    'required': { message: 'Title is required.'},
                    'minlength': { message: 'Title must be at least 4 characters long.'},
                    'maxlength': { message: 'Title cannot be more than 24 characters long.'},
                    'someCustomValidationDirective': { message: 'Someone named "Bob" cannot be a hero.'},
                },
            },
            'presentation': {
                label: 'Presentation',
                type: 'string',
                validation: {
                    'required': { message: 'Presentation is required.'},
                },
            },
            'form': {
                label: 'Form',
                type: 'string',
                validation: {
                    'required': { message: 'Form is required.'},
                }
            },
            'description': {
                label: 'Description',
                type: 'string',
                validation: {
                    'required': { message: 'Description is required.'},
                },
            },
        },
    },
    'cases': {
        label: 'Cases',
        entrypoint: {
            url: 'http://localhost:8015/',
        },
        properties: {
            'title': {
                label: 'Title',
                type: 'string',
                validation: {
                    'required': {message: 'Title is required.'},
                },
            },
        },
    },
};
