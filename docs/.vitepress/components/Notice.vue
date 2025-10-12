<template>
  <div :class="[
    'notice', 
    type,
    'rounded-lg border p-4 my-4'
  ]">
    <div class="notice-title font-semibold mb-2 flex items-center">
      <span class="mr-2" v-html="iconSvg"></span>
      {{ title }}
    </div>
    <div class="notice-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'tip' | 'warning' | 'info' | 'note'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'tip',
  title: ''
})

const iconSvg = computed(() => {
  const icons = {
    tip: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>',
    warning: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
    info: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>',
    note: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>'
  }
  return icons[props.type] || icons.tip
})

const title = computed(() => {
  if (props.title) return props.title
  
  const titles = {
    tip: 'Tip',
    warning: 'Warning', 
    info: 'Info',
    note: 'Note'
  }
  return titles[props.type] || 'Tip'
})
</script>

<style scoped>
.notice.tip {
  @apply bg-green-50 border-green-200 text-green-800;
}

.notice.warning {
  @apply bg-orange-50 border-orange-200 text-orange-800;
}

.notice.info {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}

.notice.note {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}
</style>