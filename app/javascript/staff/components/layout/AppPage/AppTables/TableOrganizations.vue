<template lang='pug'>
  .row.justify-center
    q-table(
      flat
      :data="data"
      :columns="columns"
      :visible-columns='visibleColumns'
      @request="onRequest"
      :pagination.sync="pagination"
      :loading="loading"
      loading-label='Loading organizations...'
      selection="multiple"
      :selected.sync="selected"
      row-key="id"
    )#organizations.full-width
      template(v-slot:body-cell-actions="cellProperties")
        q-td(:props="cellProperties")
          q-btn(
            label="Оборудование"
            no-wrap
            :to="{ name: 'addEquipment', params: { id: cellProperties.row.id.toString() } }"
          )
    .row.justify-center.q-gutter-md
      q-btn(
        label="Удалить"
        @click="destroy"
        :disable='disableBtn'
      )
    router-view
</template>

<script>
import eventBus from '../../../../utils/EventBus';

export default {
  data() {
    return {
      disableBtn: true,
      selected: [],
      visibleColumns: ['name', 'formOfOwnership', 'inn', 'ogrn', 'actions'],
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 15,
      },
      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'name', label: 'Название', field: 'name' },
        { name: 'formOfOwnership', label: 'Форма собственности', field: 'formOfOwnership' },
        { name: 'inn', label: 'ИНН', field: 'inn' },
        { name: 'ogrn', label: 'ОГРН', field: 'ogrn' },
        { name: 'actions', label: '', field: 'actions' },
      ],
      data: [],
    };
  },
  mounted() {
    eventBus.$on('createOrganization', () => {
      this.onRequest();
    });
    this.onRequest();
  },
  updated() {
    this.disableDeleteBtn();
  },
  methods: {
    disableDeleteBtn() {
      if (this.selected.length === 0) {
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
    },
    destroy() {
      this.$q.loading.show();
      if (this.selected.length > 0) {
        this.selected.forEach(
          (organization) => {
            this.$api.organizations
              .destroy(organization.id)
              .then(() => {
                this.onRequest();
              })
              .finally(() => {
                this.$q.loading.hide();
              });
          },
        );
      }
    },
    onRequest() {
      this.loading = true;
      this.$api.organizations
        .index()
        .then(
          (response) => {
            this.parseResponseData(response.data.data);
          },
        )
        .finally(
          () => {
            this.loading = false;
          },
        );
    },
    parseResponseData(responseData) {
      this.data = [];
      responseData.forEach(
        (record) => {
          this.data.push({
            id: record.attributes.id,
            name: record.attributes.name,
            formOfOwnership: record.attributes.form_of_ownership,
            inn: record.attributes.inn,
            ogrn: record.attributes.ogrn,
          });
        },
      );
    },
  },
};
</script>
