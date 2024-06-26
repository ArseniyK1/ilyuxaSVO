<template>
  <q-page class="full-width full-height q-pa-md">
    <div class="text-center">
      <p>Отчет для ВО, 1-4 курс, кафедра АСУ,</p>
      <p>зеленая неделя, группы: АС-20-1, АИ-20-1, ПИ-20-1,2, АС-21-1,2, АИ-21-1, ПИ-21-1, АС-22-1,2, АИ-22-1, ПИ-22-1,2, АС-23-1,2, АИ-23-1, ПИ-23-1,2.</p>
    </div>

    <q-table
      :rows="rows"
      :columns="columns"
      row-key="index"
      :pagination="{ rowsPerPage: 0 }"
      style="height:  50% !important  ;"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in columns" :key="col.name" :props="props" :class="getCellClass(props.row[col.field])">
            <span v-if="props.row[col.field] !== undefined" >
              {{ props.row[col.field] }}
            </span>
            <span v-else>—</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReportsPage',
  setup() {
    const columns = [
      { name: 'auditorium', label: 'Аудитория', field: 'auditorium' },
      { name: 'pn', label: 'Понедельник', field: 'pn' },
      { name: 'vt', label: 'Вторник', field: 'vt' },
      { name: 'sr', label: 'Среда', field: 'sr' },
      { name: 'cht', label: 'Четверг', field: 'cht' },
      { name: 'pt', label: 'Пятница', field: 'pt' },
      { name: 'sb', label: 'Суббота', field: 'sb' },
    ]

    const rows = Array.from({ length: 15 }, (_, i) => {
      const row = { index: i + 1, auditorium: 301 + i }
      const daysAbbreviations = ['pn', 'vt', 'sr', 'cht', 'pt', 'sb']
      for (let j = 0; j < daysAbbreviations.length; j++) {
        row[daysAbbreviations[j]] = Math.floor(Math.random() * 11)
      }
      return row
    })

    const getCellClass = (value) => {
      if (value >= 0 && value <= 4) return 'bg-green-6'
      else if (value >= 5 && value <= 6) return 'bg-yellow-6 text-black'
      else if (value >= 7 && value <= 10) return 'bg-red-6'
      return ''
    }

    return {
      columns,
      rows,
      getCellClass
    }
  }
})
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
</style>
