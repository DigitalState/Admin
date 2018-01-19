import { WINDOW } from 'ngx-window-token';
import { Inject } from '@angular/core';

export class PagesMenu {

    // Window-injected environment variables
    dsDiscoveryEnv: any;

    constructor(@Inject(WINDOW) protected window) {
        this.dsDiscoveryEnv = this.window['dsDiscoveryEnv']
    }

    getMenu(): Array<any> {
        return [
            {
                path: 'pages',
                children: [
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.myAccount',
                                icon: 'ion-person',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
                                class: 'my-account hidden-xs-up'
                            }
                        },
                        children: [
                            {
                                path: ['profile'],
                                data: {
                                    menu: {
                                        title: 'general.menu.profile',
                                        class: 'profile'
                                    }
                                }
                            },
                            {
                                path: ['logout'],
                                data: {
                                    menu: {
                                        title: 'login.signOut',
                                    }
                                }
                            },
                        ]
                    },
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.dashboard',
                                icon: 'ion-ios-speedometer',
                                path: ['dashboard'],
                            }
                        },
                    },

                    {
                        path: 'services',
                        data: {
                            menu: {
                                title: 'general.menu.serviceDirectory',
                                icon: 'ion-ios-keypad',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['services/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.services'
                                    }
                                }
                            },
                            {
                                path: ['services/submissions/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.submissions'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.anonymousCaseLookup',
                                        url: '#'
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.records',
                                icon: 'ion-filing',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.definitions',
                                        url: '#'
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'tasks',
                        data: {
                            menu: {
                                title: 'general.menu.tasks',
                                icon: 'ion-clipboard',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['tasks/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.taskListing',
                                    }
                                }
                            },
                            {
                                path: ['tasks/submissions/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.submissions'
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'cases',
                        data: {
                            menu: {
                                title: 'general.menu.cases',
                                icon: 'ion-ios-list-outline',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },

                    {
                        path: 'cms',
                        data: {
                            menu: {
                                title: 'general.menu.cms',
                                icon: 'ion-edit',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['cms', 'data', 'list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.data',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'text', 'list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.text',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'pages', 'list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.pages',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'files', 'list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.files',
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.bpm',
                                icon: 'ion-shuffle',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.camunda',
                                        url: this.dsDiscoveryEnv && this.dsDiscoveryEnv.camunda ? `http://${this.dsDiscoveryEnv.camunda.host}/camunda` : '',
                                        target: '_blank'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.configs',
                                        url: '#'
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'infrastructure',
                        data: {
                            menu: {
                                title: 'general.menu.infrastructure',
                                icon: 'ion-social-buffer',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.discovery',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.logging',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.antiVirus',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.deployment',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.metal',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                data: {
                                    menu: {
                                        title: 'general.menu.healthCheck',
                                        url: '#/pages/settings/health'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.search',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.apiGateway',
                                        url: '#'
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.messageQueue',
                                        url: '#'
                                    }
                                },
                            },
                        ],
                    },

                    {
                        path: 'assets',
                        data: {
                            menu: {
                                title: 'general.menu.assets',
                                icon: 'ion-images',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.definitions',
                                        url: '#'
                                    }
                                }
                            },
                        ],
                    },

                    {
                        path: 'identities',
                        data: {
                            menu: {
                                title: 'general.menu.identities',
                                icon: 'ion-person',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['identities/business-units/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.businessUnits',
                                    }
                                }
                            },
                            {
                                path: ['identities/organizations/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.organizations'
                                    }
                                }
                            },
                            {
                                path: ['identities/individuals/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.individuals'
                                    }
                                }
                            },
                            {
                                path: ['identities/staffs/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.staffs'
                                    }
                                }
                            },
                            {
                                path: ['identities/anonymouses/list'],
                                data: {
                                    menu: {
                                        title: 'general.menu.anonymouses'
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'users',
                        data: {
                            menu: {
                                title: 'general.menu.users',
                                icon: 'ion-ios-people',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.formio',
                                icon: 'ion-android-list',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
                                url: this.dsDiscoveryEnv && this.dsDiscoveryEnv.formio ? `http://${this.dsDiscoveryEnv.formio.host}` : '',
                                target: '_blank'
                            }
                        },
                    },

                    {
                        path: 'topics',
                        data: {
                            menu: {
                                title: 'general.menu.topics',
                                icon: 'ion-pound',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.directory',
                                        url: '#'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.subscriptions',
                                        url: '#'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.taxonomies',
                                        url: '#'
                                    }
                                }
                            },
                        ],
                    },

                    {
                        path: 'settings',
                        data: {
                            menu: {
                                title: 'general.menu.settings',
                                icon: 'ion-ios-gear',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['settings/systems'],
                                data: {
                                    menu: {
                                        title: 'general.menu.systems',
                                    }
                                }
                            },
                            {
                                path: ['settings/configurations/services'],
                                data: {
                                    menu: {
                                        title: 'general.menu.configurations',
                                    }
                                }
                            },
                            {
                                path: ['settings/translations'],
                                data: {
                                    menu: {
                                        title: 'general.menu.translations',
                                    }
                                }
                            },
                        ]
                    },


                    // {
                    //   path: 'records',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.records',
                    //       icon: 'ion-filing',
                    //       pathMatch: 'prefix', // use it if item children not displayed in menu
                    //       selected: false,
                    //       expanded: false,
                    //       order: 0
                    //     }
                    //   }
                    // },
                    {
                        path: 'interactions',
                        data: {
                            menu: {
                                title: 'general.menu.interactions',
                                icon: 'ion-chatbox',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.channels',
                                        url: '#'
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.phoneCall',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.inbox',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.sms',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.letterMail',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.email',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.fax',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.inPerson',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.push',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.socialMedia',
                                                url: '#'
                                            }
                                        }
                                    },
                                ],
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.communications',
                                        url: '#'
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.builder',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.transports',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.profiles',
                                                url: '#'
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.queue',
                                                url: '#'
                                            }
                                        }
                                    },
                                ],
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.bulletins',
                                        url: '#'
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                title: 'general.menu.definitions',
                                                url: '#'
                                            }
                                        }
                                    },
                                ],
                            },
                        ]
                    },

                    {
                        path: 'reporting',
                        data: {
                            menu: {
                                title: 'general.menu.reporting',
                                icon: 'ion-ios-paper',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.reportBuilder',
                                        url: '#'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.warehouse',
                                        url: '#'
                                    }
                                }
                            }
                        ]
                    },

                    {
                        path: 'documentation',
                        data: {
                            menu: {
                                title: 'general.menu.documentation',
                                icon: 'ion-ios-book',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.developerDocumentation',
                                        url: '#'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'general.menu.userGuides',
                                        url: '#'
                                    }
                                }
                            }
                        ]
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.githubRepos',
                                icon: 'ion-social-github',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
                                url: 'https://github.com/DigitalState',
                                target: '_blank'
                            }
                        },
                    },
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'general.menu.digitalStateAPI',
                                icon: 'ion-paper-airplane',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
                                url: 'https://github.com/DigitalState/Sdk/tree/master/docs/postman',
                                target: '_blank'
                            }
                        },
                    },


                    /* ng2admin original menu */
                    // {
                    //   path: 'dashboard',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.dashboard',
                    //       icon: 'ion-android-home',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 0
                    //     }
                    //   }
                    // },
                    // {
                    //   path: 'editors',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.editors',
                    //       icon: 'ion-edit',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 100,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'ckeditor',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.ck_editor',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: 'components',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.components',
                    //       icon: 'ion-gear-a',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 250,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'treeview',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.tree_view',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: 'charts',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.charts',
                    //       icon: 'ion-stats-bars',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 200,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'chartist-js',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.chartist_js',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: 'ui',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.ui_features',
                    //       icon: 'ion-android-laptop',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 300,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'typography',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.typography',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'buttons',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.buttons',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'icons',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.icons',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'modals',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.modals',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'grid',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.grid',
                    //         }
                    //       }
                    //     },
                    //   ]
                    // },
                    // {
                    //   path: 'forms',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.form_elements',
                    //       icon: 'ion-compose',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 400,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'inputs',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.form_inputs',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'layouts',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.form_layouts',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: 'tables',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.tables',
                    //       icon: 'ion-grid',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 500,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'basictables',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.basic_tables',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'smarttables',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.smart_tables',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: 'maps',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.maps',
                    //       icon: 'ion-ios-location-outline',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 600,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: 'googlemaps',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.google_maps',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'leafletmaps',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.leaflet_maps',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'bubblemaps',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.bubble_maps',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: 'linemaps',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.line_maps',
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.pages',
                    //       icon: 'ion-document',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 650,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: ['/login'],
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.login'
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: ['/register'],
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.register'
                    //         }
                    //       }
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.menu_level_1',
                    //       icon: 'ion-ios-more',
                    //       selected: false,
                    //       expanded: false,
                    //       order: 700,
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.menu_level_1_1',
                    //           url: '#'
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           title: 'general.menu.menu_level_1_2',
                    //           url: '#'
                    //         }
                    //       },
                    //       children: [
                    //         {
                    //           path: '',
                    //           data: {
                    //             menu: {
                    //               title: 'general.menu.menu_level_1_2_1',
                    //               url: '#'
                    //             }
                    //           }
                    //         }
                    //       ]
                    //     }
                    //   ]
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       title: 'general.menu.external_link',
                    //       url: 'http://akveo.com',
                    //       icon: 'ion-android-exit',
                    //       order: 800,
                    //       target: '_blank'
                    //     }
                    //   }
                    // }
                ]
            }
        ];
    }
}



