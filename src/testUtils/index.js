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

export const clickOnElementWithText = (element, selector, text, customEvent = null) => {
  element.find(selector).forEach(toClick => {
    if (toClick.text() === text) {
      toClick.simulate('click');

      if (customEvent) toClick.simulate(customEvent);
    }
  });
};

export const changeInputValue = (form, name, value) => {
  const input = form.find(`[name="${name}"]`).get(0);
  input.props.onChange({ target: { value, name }, persist: jest.fn() });
};
