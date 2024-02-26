import { createI18n } from 'vue-i18n';
import loginPage from './locales/loginPage.js';
import signupPage from './locales/signupPage.js';
import trustPage from './locales/trustPage.js';
import store from './store';

const messages = {
    en : {
        ...loginPage.en,
        ...signupPage.en,
        ...trustPage.en
    },
    de : {
    ...loginPage.de,
    ...signupPage.de,
    ...trustPage.de
    },
    id : {
    ...loginPage.id,
    ...signupPage.id,
    ...trustPage.id
    }
};

export const i18n = new createI18n({
    locale: 'en', //default language
    messages
});

store.watch(
    (state) => state.locale,
    (locale) => {
        i18n.global.locale = locale;
    }
);