<template>
  <v-container fluid class="px-5">
    <v-row>
      <v-col text-left cols=9>
        <v-row>
          <v-card width="100%">
            <v-card-title class="text-h4">
              Últimos Projetos
              <v-spacer />
              <v-btn style="text-transform: none" :to="{name: 'CreateProject'}">
                <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
                Projeto
              </v-btn>
            </v-card-title>
            
            <v-data-table
              :headers='projectHeaders'
              :items='projectItems'
              :items-per-page='5'
              sort-by="updatedAt"
              hide-default-footer
              @click:row="handleProjectRowClick"
            >
              <template v-slot:item.isActive="{item}">
                <v-simple-checkbox
                  v-model="item.isActive"
                  disabled
                />
              </template>
            </v-data-table>
          </v-card>
        </v-row>

        <v-row>
          <v-card width="100%" class="mt-5">
            <v-card-title class="text-h4">
              Minhas Organizações
            </v-card-title>
            <v-data-table
              :headers='organizationHeaders'
              :items='organizationItems'
              sort-by="name"
              hide-default-footer
              @click:row="handleOrganizationRowClick"
            />
          </v-card>
        </v-row>
      </v-col>

      <v-col cols=3>
        <InfoCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoCard from '@/components/InfoCard/InfoCard.vue';
import * as Project from '@/models/project.model';
import * as Organization from '@/models/organization.model';

export default Vue.extend({
  name: 'Home',

  components: {
    InfoCard: InfoCard,
  },

  data: function() {
    return {
      projectHeaders: [
        { text: '', value: 'icon', sortable: false },
        { text: 'Nome', align: 'start', value: 'name', sortable: false },
        { text: 'Ativo', value: 'isActive', sortable: false },
        { text: 'Descrição', value: 'description', sortable: false },
        { text: 'Atualizado em', value: 'updatedAt', sortable: false },
      ],
      organizationHeaders: [
        { text: '', value: 'icon', sortable: false },
        { text: 'Nome', align: 'start', value: 'name' },  
        { text: 'Descrição', value: 'description', sortable: false },
        { text: 'Criado em', value: 'createdAt', sortable: false },
      ],
    };
  },

  computed: {
    projectItems(): Array<Project.Front> {
      return this.$store.state.projects.projectList;
    },
    organizationItems(): Array<Organization.Front> {
      return this.$store.state.organizations.organizationList;
    },
  },

  methods: {
    handleProjectRowClick(project: Project.Front) {
      this.$router.push({name: 'ShowProject', params: { projectId: project.id || '' }});
    },

    handleOrganizationRowClick(organization: Organization.Front) {
      this.$router.push({name: 'ShowOrganization', params: { organizationId: organization.id || '' }});
    },

    fetchItems() {
      try {
        this.$store.dispatch('projects/index');
        this.$store.dispatch('organizations/index');
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fetchItems();
  }
});
</script>

<style scoped>
  
</style>
