
import {configureStore} from '@reduxjs/toolkit'
import ClassReducer from '../reducer/ClassReducer'

export default configureStore({
    reducer:{
        class:ClassReducer
    }
});













