import React from 'react';
import { mount as enzymeMount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { locale, flattenMessages, messages } from 'locale/index';
import { ThemeProvider, theme } from 'natura-ui';

export const mount = component => {
  return enzymeMount(
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        {component}
      </IntlProvider>
    </ThemeProvider>,
  );
};
