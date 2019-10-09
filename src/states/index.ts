import { getEntityState } from './entitys'
import settings from './settings';
import { getViewState } from './view'

export default {
    getEntityState,
    getViewState,
    ...settings
}