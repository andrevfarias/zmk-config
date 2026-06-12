<script setup lang="ts">
/**
 * Seção "Layout integrado": N boards (cada um com filtros de combo próprios),
 * disposição em colunas e divisão automática por grupo.
 */
import { useStore } from '../model/store'
import BoardPanel from './BoardPanel.vue'

const store = useStore()
</script>

<template>
  <div class="boards-section">
    <div class="row" style="padding: 0 14px">
      <button data-add-board title="Adicionar mais um layout com filtros próprios" @click="store.addBoard()">
        + layout
      </button>
      <button title="Cria um layout para cada grupo de combo" @click="store.splitBoardsByGroup()">
        separar por grupo
      </button>
      <label title="Número de colunas da grade de layouts">colunas</label>
      <select v-model.number="store.state.boardColumns">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
    </div>
    <div class="boards-grid" :style="{ gridTemplateColumns: `repeat(${store.state.boardColumns}, 1fr)` }">
      <BoardPanel v-for="b in store.state.boards" :key="b.id" :instance="b"
        :removable="store.state.boards.length > 1" />
    </div>
  </div>
</template>
