import './style.css'


import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

// import axios from 'axios'
import 'cors'


import Authentication from './script'
import UserPlayList from './movieRouter'


Alpine.plugin(persist)


Alpine.data('users', Authentication)
Alpine.data('movies', UserPlayList)
Alpine.start()
