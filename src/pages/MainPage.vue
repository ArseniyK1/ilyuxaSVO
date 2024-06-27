<template>
  <q-page class="full-width full-height">
    <q-tab-panels
      v-model="tab"
      animated
      style="height: calc(100vh - 62px - 100px) !important"
    >
      <q-tab-panel
        name="upload"
        style="max-width: 50%; margin: 0 auto"
        class="q-pa-md q-ma-sm full-height"
      >
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            label="Выбор групп"
            v-model="form.groups"
            :options="groupsOptions"
          />
          <q-select
            label="Выбор аудиторий"
            v-model="form.auditoriums"
            :options="auditoriumsOptions"
          />
          <q-select
            label="Выбор дней недели"
            v-model="form.days"
            multiple
            use-chips
            :options="daysOptions"
          />
          <q-input label="Выбор периода" v-model="form.period" />
          <q-btn
            label="Рассчитать загруженность"
            type="submit"
            color="primary"
          />

          <!-- Кнопка для открытия модального окна -->
          <q-btn
            label="Загрузить файл"
            color="primary"
            @click="showFileDialog = true"
          />
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

    <!-- Модальное окно -->
    <q-dialog v-model="showFileDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Выбор файла для загрузки</div>
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="showFileDialog = false"
          />
        </q-card-section>

        <q-card-section>
          <q-list bordered>
            <q-item v-for="file in files" :key="file.name">
              <q-item-section>{{ file.name }}</q-item-section>
              <q-item-section side>
                <q-btn
                  label="Загрузить"
                  color="primary"
                  @click="handleFileUpload(file)"
                />
                <q-btn
                  label="Просмотр"
                  color="secondary"
                  @click="handleFileView(file)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useAuthStore } from "stores/auth";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const authStore = useAuthStore();
    const tab = ref("upload");
    const showFileDialog = ref(false);
    const form = ref({
      groups: null,
      auditoriums: null,
      days: [],
      period: null,
    });
    const groupsOptions = ["АСУ", "ПМ", "Другое"];
    const auditoriumsOptions = ["АСУ", "ПМ", "Другое"];
    const daysOptions = [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    const files = ref([
      { name: "Институт машиностроения и транспорта (бакалавриат)" },
      { name: "Металлургический институт (бакалавриат)" },
      { name: "Институт компьютерных наук (бакалавриат)" },
      { name: "Физико-энергетический институт (бакалавриат)" },
      { name: "Институт строительства и архитектуры (бакалавриат)" },
      { name: "Институт социальных наук, экономики и права (бакалавриат)" },
    ]);
    const username = ref("");

    onMounted(() => {
      authStore.restoreAuthState();
      username.value = authStore.username;
    });

    function onSubmit() {
      // Handle form submission here
    }

    function handleFileUpload(file) {
      console.log(`Uploading file: ${file.name}`);
      showFileDialog.value = false;
    }

    function handleFileView(file) {
      console.log(`Viewing file: ${file.name}`);
      // Here you would implement the logic to view the file
    }

    return {
      tab,
      form,
      groupsOptions,
      auditoriumsOptions,
      daysOptions,
      username,
      files,
      showFileDialog,
      onSubmit,
      handleFileUpload,
      handleFileView,
    };
  },
});
</script>
