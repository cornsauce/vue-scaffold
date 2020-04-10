import {BaseAction} from '@/app/store/action';

export const SET_LOCALE = 'SET_LOCALE';

export interface SetLocaleAction extends BaseAction<typeof SET_LOCALE> {
  locale: string;
}
