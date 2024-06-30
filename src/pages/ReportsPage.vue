<template>
  <q-page class="full-width full-height q-pa-md">
    <div class="text-center">
      <p>Отчет для ВО, 1-4 курс, кафедра АСУ,</p>
      <p>зеленая и белая недели, АСУ.</p>
    </div>

    <!-- First Table -->
    <q-table
      :rows="rows1"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      style="height: 50% !important"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in columns"
            :key="col.name"
            :props="props"
            :class="getCellClass(props.row[col.field])"
          >
            <span v-if="props.row[col.field] !== undefined">
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Second Table -->
    <q-table
      :rows="rows2"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      class="q-mt-md"
      style="height: 50% !important"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in columns"
            :key="col.name"
            :props="props"
            :class="getCellClass(props.row[col.field])"
          >
            <span v-if="props.row[col.field] !== undefined">
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Free Auditoriums Tables -->
    <q-table
      v-if="showFreeTables"
      :rows="freeRows1"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      class="q-mt-md"
      style="height: 20% !important"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in columns"
            :key="col.name"
            :props="props"
            :class="getFreeCellClass(props.row[col.field])"
          >
            <span v-if="props.row[col.field] !== undefined">
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-table
      v-if="showFreeTables"
      :rows="freeRows2"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      class="q-mt-md"
      style="height: 20% !important"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in columns"
            :key="col.name"
            :props="props"
            :class="getFreeCellClass(props.row[col.field])"
          >
            <span v-if="props.row[col.field] !== undefined">
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Новая таблица -->
    <q-table
      v-if="showNewTable"
      :rows="newTableRows"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      class="q-mt-md"
      style="height: 20% !important"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in columns" :key="col.name" :props="props">
            <span v-if="props.row[col.field] !== undefined">
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="text-center q-mt-md">
      <q-btn
        icon="add"
        label="Добавить диаграмму"
        color="primary"
        @click="showDialog = true"
      />
    </div>

    <!-- Dialog for selecting chart type -->
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="row items-center">
          <span class="text-h6">Выбор диаграммы</span>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedChart"
            :options="chartOptions"
            label="Тип диаграммы"
            outlined
          >
            <template v-slot:append>
              <q-btn
                @click.stop="selectedChart = ''"
                flat
                size="md"
                v-if="selectedChart"
                icon="close"
              ></q-btn>
            </template>
          </q-select>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="days"
            :options="daysOptions"
            label="Выберите дни"
            v-if="selectedChart"
            outlined
          >
            <template v-slot:append>
              <q-btn
                @click.stop="days = ''"
                flat
                size="md"
                v-if="days"
                icon="close"
              ></q-btn>
            </template>
          </q-select>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="auditories"
            :options="auditoriesOptions"
            label="Выберите аудитории"
            v-if="selectedChart"
            outlined
          >
            <template v-slot:append>
              <q-btn
                @click.stop="auditories = ''"
                flat
                size="md"
                v-if="auditories"
                icon="close"
              ></q-btn>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Выбрать" color="primary" @click="selectChart" />
        </q-card-actions>

        <q-card-section v-if="showChartTable">
          <q-table
            :rows="chartTableData"
            :columns="columns"
            row-key="auditorium"
            :pagination="{ rowsPerPage: 0 }"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in columns" :key="col.name" :props="props">
                  <span v-if="props.row[col.field] !== undefined">
                    {{ props.row[col.field] }}
                  </span>
                  <span v-else>—</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Histogram Chart -->
    <div v-if="showHistogram" class="q-mt-md histogram-container">
      <div
        class="histogram-bar"
        v-for="(bar, index) in histogramData"
        :key="index"
      >
        <div
          class="bar"
          :style="{ height: bar.height + '%' }"
          :title="bar.label + ': ' + bar.value"
        ></div>
        <div class="label">{{ bar.label }}</div>
      </div>
    </div>

    <!-- Download Button -->
    <div class="text-center q-mt-md">
      <q-btn
        icon="get_app"
        label="Скачать отчет PDF"
        color="primary"
        @click="downloadPDF"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "ReportsPage",
  setup() {
    const columns = [
      { name: "auditorium", label: "Аудитория", field: "auditorium" },
      { name: "pn", label: "Понедельник", field: "pn" },
      { name: "vt", label: "Вторник", field: "vt" },
      { name: "sr", label: "Среда", field: "sr" },
      { name: "cht", label: "Четверг", field: "cht" },
      { name: "pt", label: "Пятница", field: "pt" },
      { name: "sb", label: "Суббота", field: "sb" },
    ];

    const rows1 = [
      { index: 1, auditorium: 349, pn: 1, vt: 2, sr: 0, cht: 3, pt: 1, sb: 0 },
      { index: 2, auditorium: 350, pn: 2, vt: 1, sr: 0, cht: 0, pt: 2, sb: 3 },
      { index: 3, auditorium: 351, pn: 0, vt: 1, sr: 1, cht: 1, pt: 0, sb: 0 },
      { index: 4, auditorium: 353, pn: 5, vt: 2, sr: 0, cht: 1, pt: 1, sb: 0 },
      { index: 5, auditorium: 357, pn: 7, vt: 1, sr: 1, cht: 1, pt: 4, sb: 3 },
      { index: 6, auditorium: 360, pn: 2, vt: 3, sr: 1, cht: 2, pt: 2, sb: 2 },
      { index: 7, auditorium: 362, pn: 7, vt: 3, sr: 1, cht: 2, pt: 2, sb: 2 },
      { index: 8, auditorium: 363, pn: 3, vt: 0, sr: 0, cht: 1, pt: 1, sb: 3 },
    ];

    const rows2 = [
      { index: 1, auditorium: 349, pn: 1, vt: 2, sr: 0, cht: 3, pt: 1, sb: 0 },
      { index: 2, auditorium: 350, pn: 1, vt: 2, sr: 0, cht: 0, pt: 3, sb: 4 },
      { index: 3, auditorium: 351, pn: 0, vt: 1, sr: 2, cht: 1, pt: 0, sb: 0 },
      { index: 4, auditorium: 353, pn: 4, vt: 2, sr: 0, cht: 1, pt: 0, sb: 0 },
      { index: 5, auditorium: 357, pn: 7, vt: 1, sr: 0, cht: 1, pt: 5, sb: 3 },
      { index: 6, auditorium: 360, pn: 2, vt: 3, sr: 1, cht: 2, pt: 2, sb: 4 },
      { index: 7, auditorium: 362, pn: 6, vt: 3, sr: 1, cht: 2, pt: 2, sb: 5 },
      { index: 8, auditorium: 363, pn: 2, vt: 0, sr: 0, cht: 1, pt: 1, sb: 3 },
    ];

    const freeRows1 = ref([]);
    const freeRows2 = ref([]);
    const newTableRows = ref([]);
    const showFreeTables = ref(false);
    const showDialog = ref(false);
    const showNewTable = ref(false);
    const selectedChart = ref(null);
    const days = ref("");
    const auditories = ref("");
    const auditoriesOptions = [
      { label: "Все аудитории", value: "all" },
      { label: "Аудитория 349", value: "349" },
      { label: "Аудитория 350", value: "350" },
      { label: "Аудитория 351", value: "351" },
      { label: "Аудитория 353", value: "353" },
      { label: "Аудитория 357", value: "357" },
      { label: "Аудитория 360", value: "360" },
      { label: "Аудитория 362", value: "362" },
      { label: "Аудитория 363", value: "363" },
    ];
    const daysOptions = [
      { label: "Все дни", value: "all" },
      { label: "Понедельник", value: "pn" },
      { label: "Вторник", value: "vt" },
      { label: "Среда", value: "sr" },
      { label: "Четверг", value: "cht" },
      { label: "Пятница", value: "pt" },
      { label: "Суббота", value: "sb" },
    ];
    const chartOptions = [
      { label: "Специальность (аудитории/дни)", value: "specialty" },
      { label: "Подразделение (аудитории/дни)", value: "department" },
      { label: "Свободные аудитории (время/дни)", value: "freeAuditoriums" },
      { label: "Группа (аудитория/дни)", value: "group" },
      { label: "Аудитория (время/дни)", value: "auditorium" },
    ];

    const showHistogram = ref(false);
    const histogramData = ref([]);

    const getCellClass = (value) => {
      if (value >= 0 && value < 4) return "bg-green-2";
      else if (value >= 4 && value < 6) return "bg-yellow-2 text-black";
      else if (value >= 6 && value <= 8) return "bg-red-2";
      return "";
    };

    const getFreeCellClass = (value) => {
      return value === "Свободна" ? "bg-green-2" : "bg-red-2";
    };

    const selectChart = () => {
      console.log("Selected chart:", selectedChart.value);
      showDialog.value = false;

      if (selectedChart.value === "freeAuditoriums") {
        generateFreeAuditoriumsData();
      } else {
        generateFakeData();
        showNewTable.value = true;
      }
    };

    const generateFreeAuditoriumsData = () => {
      freeRows1.value = rows1.map((row) => ({
        ...row,
        pn: row.pn === 0 ? "Свободна" : "Занята",
        vt: row.vt === 0 ? "Свободна" : "Занята",
        sr: row.sr === 0 ? "Свободна" : "Занята",
        cht: row.cht === 0 ? "Свободна" : "Занята",
        pt: row.pt === 0 ? "Свободна" : "Занята",
        sb: row.sb === 0 ? "Свободна" : "Занята",
      }));

      freeRows2.value = rows2.map((row) => ({
        ...row,
        pn: row.pn === 0 ? "Свободна" : "Занята",
        vt: row.vt === 0 ? "Свободна" : "Занята",
        sr: row.sr === 0 ? "Свободна" : "Занята",
        cht: row.cht === 0 ? "Свободна" : "Занята",
        pt: row.pt === 0 ? "Свободна" : "Занята",
        sb: row.sb === 0 ? "Свободна" : "Занята",
      }));

      showFreeTables.value = true;
    };

    const generateFakeData = () => {
      const fakeData = [
        {
          auditorium: 349,
          pn: "Фейк 1",
          vt: "Фейк 2",
          sr: "Фейк 3",
          cht: "Фейк 4",
          pt: "Фейк 5",
          sb: "Фейк 6",
        },
        {
          auditorium: 350,
          pn: "Фейк 1",
          vt: "Фейк 2",
          sr: "Фейк 3",
          cht: "Фейк 4",
          pt: "Фейк 5",
          sb: "Фейк 6",
        },
        {
          auditorium: 351,
          pn: "Фейк 1",
          vt: "Фейк 2",
          sr: "Фейк 3",
          cht: "Фейк 4",
          pt: "Фейк 5",
          sb: "Фейк 6",
        },
        {
          auditorium: 353,
          pn: "Фейк 1",
          vt: "Фейк 2",
          sr: "Фейк 3",
          cht: "Фейк 4",
          pt: "Фейк 5",
          sb: "Фейк 6",
        },
        {
          auditorium: 357,
          pn: "Фейк 1",
          vt: "Фейк 2",
          sr: "Фейк 3",
          cht: "Фейк 4",
          pt: "Фейк 5",
          sb: "Фейк 6",
        },
      ];
      newTableRows.value = fakeData;
    };

    const downloadPDF = () => {
      const element = document.getElementById("table-section");
      html2pdf().from(element).save("table.pdf");
    };

    return {
      columns,
      rows1,
      rows2,
      freeRows1,
      freeRows2,
      showFreeTables,
      showDialog,
      selectedChart,
      days,
      auditories,
      auditoriesOptions,
      daysOptions,
      chartOptions,
      showHistogram,
      histogramData,
      getCellClass,
      getFreeCellClass,
      selectChart,
      generateFreeAuditoriumsData,
      generateFakeData,
      downloadPDF,
      showNewTable,
      newTableRows,
    };
  },
});
</script>

<style scoped>
.bg-green-2 {
  background-color: #c8e6c9 !important;
}
.bg-yellow-2 {
  background-color: #fff9c4 !important;
}
.bg-red-2 {
  background-color: #ffcdd2 !important;
}

.histogram-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 300px;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.histogram-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14%;
}

.histogram-bar .bar {
  width: 100%;
  background-color: #42a5f5;
  transition: height 0.3s ease;
}

.histogram-bar .label {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}
</style>
