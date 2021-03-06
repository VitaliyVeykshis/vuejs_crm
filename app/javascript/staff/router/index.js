import Vue from 'vue';
import VueRouter from 'vue-router';

import appClients from '../components/AppClients.vue';
import appOrganizations from '../components/AppOrganizations.vue';
import appStaffs from '../components/AppStaffs.vue';
import editClientDialog from '../components/layout/AppDialogs/EditClientDialog.vue';
import addClientDialog from '../components/layout/AppDialogs/AddClientDialog.vue';
import editStaffDialog from '../components/layout/AppDialogs/EditStaffDialog.vue';
import addStaffDialog from '../components/layout/AppDialogs/AddStaffDialog.vue';
import bindOrganizationDialog from '../components/layout/AppDialogs/BindOrganizationDialog.vue';
import addEquipmentDialog from '../components/layout/AppDialogs/AddEquipmentDialog.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  hashbangs: false,
  base: '/staff',
  routes: [
    {
      path: '/clients',
      component: appClients,
      name: 'clients',
      children: [
        {
          path: '/clients/:id/edit',
          component: editClientDialog,
          name: 'editClient',
          props: true,
        },
        {
          path: '/clients/add',
          component: addClientDialog,
          name: 'addClient',
        },
        {
          path: '/clients/bind/organization',
          component: bindOrganizationDialog,
          name: 'bindOrganization',
          props: true,
        },
      ],
    },
    {
      path: '/organizations',
      component: appOrganizations,
      name: 'organizations',
      children: [
        {
          path: '/organizations/:id/equipment',
          component: addEquipmentDialog,
          name: 'addEquipment',
          props: true,
        },
      ],
    },
    {
      path: '/staffs',
      component: appStaffs,
      name: 'staffs',
      children: [
        {
          path: '/staffs/:id/edit',
          component: editStaffDialog,
          name: 'editStaff',
          props: true,
        },
        {
          path: '/staffs/add',
          component: addStaffDialog,
          name: 'addStaff',
        },
      ],
    },
  ],
});
