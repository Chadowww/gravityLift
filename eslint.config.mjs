// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'no-console': 'warn',
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'vue/multi-word-component-names': 'off' // très utile pour éviter une erreur sur `index.vue`
    }
})
