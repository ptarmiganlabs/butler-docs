<template>
  <div class="responsive-image-wrapper">
    <img 
      :src="src" 
      :alt="alt" 
      :style="computedStyle"
      class="responsive-image"
      :class="{ 'zoomable': zoomable }"
    />
    <p v-if="caption" class="image-caption">{{ caption }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: '800px'
  },
  caption: {
    type: String,
    default: ''
  },
  zoomable: {
    type: Boolean,
    default: true
  },
  centered: {
    type: Boolean,
    default: true
  }
})

const computedStyle = computed(() => ({
  maxWidth: props.maxWidth,
  width: '100%',
  height: 'auto'
}))
</script>

<style scoped>
.responsive-image-wrapper {
  margin: 1.5rem 0;
  text-align: center;
}

.responsive-image {
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.responsive-image.zoomable {
  cursor: zoom-in;
}

.responsive-image.zoomable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-caption {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* Mobile optimization */
@media (max-width: 768px) {
  .responsive-image-wrapper {
    margin: 1rem 0;
  }
  
  .responsive-image {
    border-radius: 4px;
  }
}

/* Dark mode support */
.dark .responsive-image {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.dark .responsive-image.zoomable:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
</style>
