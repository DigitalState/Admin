
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
                }
            }
        }
    },
    'cases': {
        label: 'Cases',
        entrypoint: {
            url: 'http://localhost:8015/',
        },
    },
};
