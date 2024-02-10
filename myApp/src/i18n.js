import Vue from 'vue';
import Vuei18n from 'vue-i18n';
import en from './locales/en.json';
import de from './locales/de.json';
import id from './locales/id.json';

Vue.useAttrs(Vuei18n);

const messages = {
    en,
    de,
    id
};

const i18n = new Vuei18n({
    locale: 'en', //default language
    messages
});

export default i18n;