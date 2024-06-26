<template>
  <q-page class="full-width full-height">
    <q-tabs v-model="tab" class="text-teal row full-width" align="justify" >
      <q-tab name="upload" label="Загрузить файл" />
      <q-tab name="view" label="Просмотр" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated  style="height: calc(100vh - 62px - 100px) !important;">
      <q-tab-panel name="upload" style="max-width: 50%; margin: 0 auto" class="q-pa-md q-ma-sm full-height"  >
        <q-form @submit="onSubmit" class="q-gutter-md ">
          <q-select label="Выбор групп" v-model="form.groups" :options="groupsOptions" />
          <q-select label="Выбор аудиторий" v-model="form.auditoriums" :options="auditoriumsOptions" />
          <q-select label="Выбор дней недели" v-model="form.days" multiple :options="daysOptions" />
          <q-input label="Выбор периода" v-model="form.period" />
          <q-btn label="Рассчитать загруженность" type="submit" color="primary" />
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="view">
        <q-card>
          <q-card-section>
            <div class="text-h6">Просмотр</div>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {
      tab: ref('upload'),
      form: ref({
        groups: null,
        auditoriums: null,
        days: [],
        period: null
      }),
      groupsOptions: ['Группа 1', 'Группа 2', 'Группа 3'],
      auditoriumsOptions: ['Аудитория 1', 'Аудитория 2', 'Аудитория 3'],
      daysOptions: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      onSubmit() {
        // Handle form submission here
      }
    }
  }
})
</script>
