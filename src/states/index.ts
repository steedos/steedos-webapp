import { getEntityState } from './entitys'
import settings from './settings';
import bootstrap from './bootstrap';

export default {
    getEntityState,
    ...settings,
    ...bootstrap
}