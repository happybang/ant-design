import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { ModalLocale, changeConfirmLocale } from '../modal/locale';

export interface Locale {
  locale: string;
  Pagination?: Object;
  DatePicker?: Object;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: Object;
  Modal?: ModalLocale;
  Popconfirm?: Object;
  Transfer?: Object;
  Select?: Object;
  Upload?: Object;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactElement<any>;
}

function setMomentLocale(locale: Locale) {
  if (locale && locale.locale) {
    moment.locale(locale.locale);
  } else {
    moment.locale('en');
  }
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: PropTypes.object,
  };

  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
  };

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  componentWillMount() {
    setMomentLocale(this.props.locale);
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps: LocaleProviderProps) {
    const { locale } = this.props;
    const nextLocale = nextProps.locale;
    if (locale !== nextLocale) {
      setMomentLocale(nextProps.locale);
    }
  }

  componentDidUpdate() {
    const { locale } = this.props;
    changeConfirmLocale(locale && locale.Modal);
  }

  componentWillUnmount() {
    changeConfirmLocale();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
