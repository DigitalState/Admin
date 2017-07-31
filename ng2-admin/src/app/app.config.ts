/**
 * CSS breakpoints that should match their ones defined in the CSS grid settings
 * @see: app/theme/sass/bootstrap-overrides/_variables.scss
 */
const MEDIA_BREAKPOINTS = {
    'nl': '0',
    'xs': '500',
    'sm': '660',
    'md': '768',
    'lg': '991',
    'xl': '1170',
};

function config() {
    let conf = {
        'breakpoints': MEDIA_BREAKPOINTS,
        'mediaQueryAliases': {
            'small': `screen and (max-width:${MEDIA_BREAKPOINTS.sm}px)`
        }
    };

    return conf;
};

export default config();
