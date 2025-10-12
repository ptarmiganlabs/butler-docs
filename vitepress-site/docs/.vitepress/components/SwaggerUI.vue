<template>
  <div>
    <div v-if="loading" class="swagger-loading">
      Loading API documentation...
    </div>
    <div v-if="error" class="swagger-error">
      Failed to load API documentation: {{ error }}
      <p>You can download the <a :href="url" target="_blank">raw OpenAPI specification</a> instead.</p>
    </div>
    <div 
      ref="swaggerContainer" 
      id="swagger-ui-container"
      class="swagger-ui-container"
      v-show="!loading && !error"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'

export default {
  name: 'SwaggerUI',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const swaggerContainer = ref(null)
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      await nextTick()
      
      try {
        // Load CSS first
        if (!document.querySelector('link[href="https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css'
          document.head.appendChild(link)
        }

        // Load Swagger UI bundle from CDN
        if (!window.SwaggerUIBundle) {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/swagger-ui-dist@latest/swagger-ui-bundle.js'
          script.onload = initializeSwaggerUI
          script.onerror = () => {
            error.value = 'Failed to load Swagger UI from CDN'
            loading.value = false
          }
          document.head.appendChild(script)
        } else {
          initializeSwaggerUI()
        }

        function initializeSwaggerUI() {
          try {
            window.SwaggerUIBundle({
              url: props.url,
              dom_id: '#swagger-ui-container',
              deepLinking: true,
              presets: [
                window.SwaggerUIBundle.presets.apis,
                window.SwaggerUIBundle.presets.standalone
              ],
              plugins: [
                window.SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout",
              validatorUrl: null,
              onComplete: () => {
                loading.value = false
              },
              onFailure: (err) => {
                console.error('Swagger UI failed to load:', err)
                error.value = err.message || 'Unknown error'
                loading.value = false
              }
            })
          } catch (err) {
            console.error('Failed to initialize Swagger UI:', err)
            error.value = err.message || 'Failed to initialize Swagger UI'
            loading.value = false
          }
        }
      } catch (err) {
        console.error('Failed to load Swagger UI:', err)
        error.value = err.message || 'Failed to load Swagger UI'
        loading.value = false
      }
    })

    return {
      swaggerContainer,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.swagger-loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.swagger-error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #d63384;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.375rem;
  margin: 1rem 0;
}

.swagger-error a {
  color: #842029;
  text-decoration: underline;
}

.swagger-ui-container {
  margin: 1rem 0;
}

/* Override some Swagger UI styles to match VitePress theme */
:deep(.swagger-ui) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

:deep(.swagger-ui .topbar) {
  display: none;
}

:deep(.swagger-ui .info) {
  margin: 20px 0;
}

:deep(.swagger-ui .scheme-container) {
  margin: 0 0 20px 0;
  padding: 10px 0;
}

:deep(.swagger-ui .wrapper) {
  padding: 0;
}
</style>
