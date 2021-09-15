import styles from './App.less';
import { history } from 'umi';
import APP from './home/App';
import store from '@/redux/store';
import { Provider } from 'react-redux';

export default function IndexPage() {
  return (
    <Provider store={store}>
      <APP></APP>
    </Provider>
  );
}
