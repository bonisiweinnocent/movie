import './style.css'


import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'


import 'cors'




// import Authentication from './script'


Alpine.plugin(persist)

window.Alpine = Alpine

// Alpine.data('loveCounter', LoveCounter);
// Alpine.data('quoteApp', Quotes)
// Alpine.data('jokeApp', Quotes)
// Alpine.data('users', Authentication)
Alpine.start()
