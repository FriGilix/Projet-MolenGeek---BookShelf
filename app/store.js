import counterReducer from './features/CounterSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        counter : counterReducer
    }
})

export default store