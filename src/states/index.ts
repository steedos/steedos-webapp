import { getEntityState } from './entitys'
import settings from './settings';
import bootstrap from './bootstrap';
import { getViewState } from './view'

export default {
    getEntityState,
    getViewState,
    ...settings,
    ...bootstrap
}