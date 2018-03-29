
export class PagesMenu {

    constructor() {

    }

    /**
     * @param discovery {Object} Microservices Discovery data
     * @return Array<any>
     */
    getMenu(discovery: any): Array<any> {
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
                                        url: '#/pages/profile',
                                        title: 'general.menu.profile',
                                        class: 'profile'
                                    }
                                }
                            },
                            {
                                path: ['logout'],
                                data: {
                                    menu: {
                                        url: '#/pages/logout',
                                        title: 'login.signOut',
                                    }
                                }
                            },
                        ]
                    },
                    {
                        path: ['services', 'list'],
                        data: {
                            menu: {
                                url: '#/pages/services/list',
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
                                        url: '#/pages/services/list',
                                        title: 'general.menu.services'
                                    }
                                }
                            },
                            {
                                path: ['services/submissions/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/services/submissions/list',
                                        title: 'general.menu.submissions'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.anonymousCaseLookup',
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
                                path: ['records/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/records/list',
                                        title: 'general.menu.records',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.definitions',
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
                                        url: '#/pages/tasks/list',
                                        title: 'general.menu.taskListing',
                                    }
                                }
                            },
                            {
                                path: ['tasks/submissions/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/tasks/submissions/list',
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
                                url: '#/pages/cases/list',
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
                                        url: '#/pages/cms/data/list',
                                        title: 'general.menu.data',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'text', 'list'],
                                data: {
                                    menu: {
                                        url: '#/pages/cms/text/list',
                                        title: 'general.menu.text',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'pages', 'list'],
                                data: {
                                    menu: {
                                        url: '#/pages/cms/pages/list',
                                        title: 'general.menu.pages',
                                    }
                                }
                            },
                            {
                                path: ['cms', 'files', 'list'],
                                data: {
                                    menu: {
                                        url: '#/pages/cms/files/list',
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
                                        url: discovery && discovery.camunda ? `http://${discovery.camunda.replace('engine-rest', 'camunda')}` : '',
                                        title: 'general.menu.camunda',
                                        target: '_blank'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.configs',
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
                                        url: '#',
                                        title: 'general.menu.discovery',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.logging',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.antiVirus',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.deployment',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.metal',
                                    }
                                },
                            },
                            {
                                path: '',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                data: {
                                    menu: {
                                        url: '#/pages/settings/health',
                                        title: 'general.menu.healthCheck',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.search',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.apiGateway',
                                    }
                                },
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.messageQueue',
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
                                        url: '#',
                                        title: 'general.menu.definitions',
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
                                        url: '#/pages/identities/business-units/list',
                                        title: 'general.menu.businessUnits',
                                    }
                                }
                            },
                            {
                                path: ['identities/organizations/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/identities/organizations/list',
                                        title: 'general.menu.organizations',
                                    }
                                }
                            },
                            {
                                path: ['identities/individuals/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/identities/individuals/list',
                                        title: 'general.menu.individuals',
                                    }
                                }
                            },
                            {
                                path: ['identities/staffs/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/identities/staffs/list',
                                        title: 'general.menu.staffs',
                                    }
                                }
                            },
                            {
                                path: ['identities/anonymouses/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/identities/anonymouses/list',
                                        title: 'general.menu.anonymouses',
                                    }
                                }
                            },
                            {
                                path: ['identities/roles/list'],
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.roles',
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'users',
                        data: {
                            menu: {
                                url: '#/pages/users/list',
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
                                url: discovery && discovery.formio ? `http://${discovery.formio}` : '',
                                title: 'general.menu.formio',
                                icon: 'ion-android-list',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
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
                                        url: '#',
                                        title: 'general.menu.directory',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.subscriptions',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.taxonomies',
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
                                        url: '#/pages/settings/systems',
                                        title: 'general.menu.systems',
                                    }
                                }
                            },
                            {
                                path: ['settings/configurations/services'],
                                data: {
                                    menu: {
                                        url: '#/pages/settings/configurations/services',
                                        title: 'general.menu.configurations',
                                    }
                                }
                            },
                            {
                                path: ['settings/translations'],
                                data: {
                                    menu: {
                                        url: '#/pages/settings/translations',
                                        title: 'general.menu.translations',
                                    }
                                }
                            },
                            {
                                path: ['settings/themer/admin'],
                                data: {
                                    menu: {
                                        url: '#/pages/settings/themer/admin',
                                        title: 'general.menu.themeEditor',
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
                                        url: '#',
                                        title: 'general.menu.channels',
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.phoneCall',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.inbox',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.sms',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.letterMail',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.email',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.fax',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.inPerson',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.push',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.socialMedia',
                                            }
                                        }
                                    },
                                ],
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.communications',
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.builder',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.transports',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.profiles',
                                            }
                                        }
                                    },
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.queue',
                                            }
                                        }
                                    },
                                ],
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.bulletins',
                                    }
                                },
                                children: [
                                    {
                                        path: '',
                                        data: {
                                            menu: {
                                                url: '#',
                                                title: 'general.menu.definitions',
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
                                        url: '#',
                                        title: 'general.menu.reportBuilder',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.warehouse',
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
                                        url: '#',
                                        title: 'general.menu.developerDocumentation',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.userGuides',
                                    }
                                }
                            }
                        ]
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                url: 'https://github.com/DigitalState',
                                title: 'general.menu.githubRepos',
                                icon: 'ion-social-github',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
                                target: '_blank'
                            }
                        },
                    },
                    {
                        path: '',
                        data: {
                            menu: {
                                url: 'https://github.com/DigitalState/Sdk/tree/master/docs/postman',
                                title: 'general.menu.digitalStateAPI',
                                icon: 'ion-paper-airplane',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0,
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



