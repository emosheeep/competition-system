import SearchForm from './SearchForm';
import AuditForm from './ConfigForm';
import { isFunction } from 'lodash-es';

function register(Vue, comp, options) {
  const { matcher, locale } = options;
  if (isFunction(matcher)) {
    comp.props.matcher.default = matcher;
  }
  if (isFunction(locale)) {
    comp.props.locale.default = locale;
  }
  Vue.component(comp.name, comp);
}

SearchForm.install = function(Vue, options = {}) {
  register(Vue, SearchForm, options);
};

AuditForm.install = function(Vue, options = {}) {
  register(Vue, AuditForm, options);
};

export { SearchForm, AuditForm };

export default function(Vue, options = {}) {
  Vue.use(SearchForm, options);
  Vue.use(AuditForm, options);
};
