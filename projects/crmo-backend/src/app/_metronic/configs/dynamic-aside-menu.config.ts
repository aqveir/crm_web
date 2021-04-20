export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/secure/dashboard',
      translate: 'MENU.DASHBOARD.LABEL',
      bullet: 'dot',
    },
    {
      title: 'Work Queue',
      root: true,
      icon: 'flaticon2-expand',
      page: '/secure/queue',
      svg: './assets/media/svg/icons/Layout/Layout-4-blocks.svg'
    },
    {
      title: 'Contacts',
      root: true,
      icon: 'flaticon2-expand',
      page: '/secure/contact',
      svg: './assets/media/svg/icons/Layout/Layout-left-panel-2.svg'
    },
    {
      title: 'setting',
      root: true,
      icon: 'flaticon2-expand',
      svg: 'assets/media/svg/icons/Code/Settings4.svg',
      alignment: 'left',
      toggle: 'click',
      page: '',
      translate: 'MENU.SETTING.LABEL',
      submenu: [
        {
          title: 'organization',
          bullet: 'dot',
          icon: 'flaticon2-shelterflaticon-business',
          permission: 'accessToECommerceModule',
          page: '/secure/setting/organization',
          translate: 'MENU.SETTING.ORGANIZATION.LABEL',
        },
        {
          title: 'User Management',
          bullet: 'dot',
          icon: 'flaticon-user',
          page: '',
          translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.LABEL',
          submenu: [
            {
              title: 'users',
              page: 'organization/:ohash/user',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.USER.LABEL',
            },
            {
              title: 'roles',
              page: '/user-management/roles',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.ROLE.LABEL',
            }
          ]
        },
        {
          title: 'Error Pages',
          bullet: 'dot',
          icon: 'flaticon2-list-2',
          page: '/error',
          submenu: [
            {
              title: 'Error 1',
              page: '/error/error-1'
            },
            {
              title: 'Error 2',
              page: '/error/error-2'
            },
            {
              title: 'Error 3',
              page: '/error/error-3'
            },
            {
              title: 'Error 4',
              page: '/error/error-4'
            },
            {
              title: 'Error 5',
              page: '/error/error-5'
            },
            {
              title: 'Error 6',
              page: '/error/error-6'
            },
          ]
        },
        {
          title: 'Wizards',
          bullet: 'dot',
          icon: 'flaticon2-mail-1',
          page: '/wizards',
          submenu: [
            {
              title: 'Wizard 1',
              page: '/wizards/wizard-1'
            },
            {
              title: 'Wizard 2',
              page: '/wizards/wizard-2'
            },
            {
              title: 'Wizard 3',
              page: '/wizards/wizard-3'
            },
            {
              title: 'Wizard 4',
              page: '/wizards/wizard-4'
            },
          ]
        }
      ]
    }
  ],
  tabs:[
    {
      name: 'aside_tab_dashboard',
      title: 'Dashboard',
      root: true,
      type: 'link', //link/pop/dropdown/
      icon: 'flaticon2-layers',
      page: '/secure/dashboard',
      translate: 'MENU.DASHBOARD.LABEL',
      bullet: 'dot',
    },
    {
      name: 'aside_tab_queue',
      title: 'work_queue',
      root: true,
      type: 'link',
      icon: 'flaticon2-menu-4',
      page: '/secure/queue',
      translate: 'MENU.WORK_QUEUE.LABEL'
    },
    {
      name: 'aside_tab_account_list',
      title: 'accounts',
      root: true,
      type: 'link',
      icon: 'flaticon-add-label-button',
      page: '/secure/account',
      permission: ['list_all_organization_accounts'],
      translate: 'MENU.ACCOUNT_LIST.LABEL'
    },
    {
      name: 'aside_tab_contact_list',
      title: 'contacts',
      root: true,
      type: 'link',
      icon: 'flaticon2-avatar',
      page: '/secure/contact',
      permission: ['list_all_contacts'],
      translate: 'MENU.CONTACT_LIST.LABEL'
    },
    {
      name: 'aside_tab_lead_list',
      title: 'request-leads',
      root: true,
      type: 'link',
      icon: 'flaticon2-expand',
      page: '/secure/leads',
      translate: 'MENU.LEAD_LIST.LABEL'
    },
    {
      name: 'aside_tab_opportunity_list',
      title: 'request-opportunities',
      root: true,
      type: 'link',
      icon: 'flaticon2-expand',
      page: '/secure/opportunities',
      translate: 'MENU.OPPORTUNITY_LIST.LABEL'
    },
    {
      name: 'aside_tab_task_list',
      title: 'Tasks',
      root: true,
      type: 'link',
      icon: 'flaticon2-shield',
      page: '/secure/tasks',
      translate: 'MENU.TASK_LIST.LABEL',
    },
    {
      name: 'aside_tab_event_list',
      title: 'Events',
      root: true,
      type: 'link',
      icon: 'flaticon2-calendar-1',
      page: '/secure/events',
      translate: 'MENU.EVENT_LIST.LABEL',
    },
    {
      name: 'aside_tab_setting_organization_list',
      title: 'Setting',
      root: true,
      type: 'link',
      icon: 'flaticon2-settings',
      alignment: 'center',
      page: '/secure/setting/organization',
      permission: ['list_all_organizations'],
      translate: 'MENU.SETTING.ORGANIZATION.LABEL',
      submenu: [
        {
          title: 'organization detail',
          bullet: 'dot',
          icon: 'flaticon2-shelter',
          permission: 'accessToECommerceModule',
          page: '/secure/setting/organization/oHash',
          translate: 'MENU.SETTING.ORGANIZATION.DETAIL.LABEL',
        },
        {
          title: 'User Management',
          bullet: 'dot',
          icon: 'flaticon2-user-1',
          translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.LABEL',
          submenu: [
            {
              title: 'users',
              page: '/secure/setting/organization/oHash/user',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.USER.LABEL',
            },
            {
              title: 'roles',
              page: '/secure/setting/organization/oHash/role',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.ROLE.LABEL',
            }
          ]
        },
        {
          title: 'Meta Data',
          icon: 'flaticon2-user-1',
          translate: 'MENU.SETTING.ORGANIZATION.META_DATA.LABEL',
          submenu: [
            {
              title: 'lists',
              page: '/secure/setting/organization/oHash/lists',
              translate: 'MENU.SETTING.ORGANIZATION.META_DATA.LOOKUP.LABEL',
            },
            {
              title: 'preferences',
              page: '/secure/setting/organization/oHash/preference',
              translate: 'MENU.SETTING.ORGANIZATION.META_DATA.PREFERENCES.LABEL',
            }
          ]
        }
      ]
    },
    {
      name: 'aside_tab_setting_list',
      title: 'Setting',
      root: false,
      type: 'link',
      icon: 'flaticon2-settings',
      alignment: 'left',
      page: '/secure/setting/organization',
      permission: ['edit_organization_data', '!list_all_organizations'],
      translate: 'MENU.SETTING.LABEL',
      submenu: [
        {
          title: 'organization detail',
          bullet: 'dot',
          icon: 'flaticon2-shelter',
          permission: 'accessToECommerceModule',
          page: '/secure/setting/organization/oHash',
          translate: 'MENU.SETTING.ORGANIZATION.DETAIL.LABEL',
        },
        {
          title: 'User Management',
          bullet: 'dot',
          icon: 'flaticon2-user-1',
          translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.LABEL',
          submenu: [
            {
              title: 'users',
              page: '/secure/setting/organization/oHash/user',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.USER.LABEL',
            },
            {
              title: 'roles',
              page: '/secure/setting/organization/oHash/role',
              translate: 'MENU.SETTING.ORGANIZATION.USER_MANAGEMENT.ROLE.LABEL',
            }
          ]
        },
        {
          title: 'Manage Preferences',
          bullet: 'dot',
          icon: 'flaticon2-user-1',
          translate: 'MENU.SETTING.ORGANIZATION.PREFERENCES.LABEL',
        },
        {
          title: 'Error Pages',
          bullet: 'dot',
          icon: 'flaticon2-list-2',
          page: '/error',
          submenu: [
            {
              title: 'Error 1',
              page: '/error/error-1'
            },
            {
              title: 'Error 2',
              page: '/error/error-2'
            },
            {
              title: 'Error 3',
              page: '/error/error-3'
            },
            {
              title: 'Error 4',
              page: '/error/error-4'
            },
            {
              title: 'Error 5',
              page: '/error/error-5'
            },
            {
              title: 'Error 6',
              page: '/error/error-6'
            },
          ]
        },
        {
          title: 'Wizards',
          bullet: 'dot',
          icon: 'flaticon2-mail-1',
          page: '/wizards',
          submenu: [
            {
              title: 'Wizard 1',
              page: '/wizards/wizard-1'
            },
            {
              title: 'Wizard 2',
              page: '/wizards/wizard-2'
            },
            {
              title: 'Wizard 3',
              page: '/wizards/wizard-3'
            },
            {
              title: 'Wizard 4',
              page: '/wizards/wizard-4'
            },
          ]
        }
      ]
    }
  ],
};
