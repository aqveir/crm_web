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
          icon: 'flaticon-business',
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
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/secure/dashboard',
      translate: 'MENU.DASHBOARD.LABEL',
      bullet: 'dot',
    },
    {
      name: 'aside_tab_queue',
      title: 'Work Queue',
      root: true,
      type: 'link',
      icon: 'flaticon2-expand',
      page: '/secure/queue',
      svg: './assets/media/svg/icons/Layout/Layout-4-blocks.svg'
    },
    {
      name: 'aside_tab_contact_list',
      title: 'Contacts',
      root: true,
      type: 'link',
      icon: 'flaticon2-expand',
      page: '/secure/contacts',
      svg: './assets/media/svg/icons/Communication/Group.svg'
    },
    {
      name: 'aside_tab_setting_list',
      title: 'setting',
      root: true,
      type: 'link',
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
          icon: 'flaticon-business',
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
  ]
};
