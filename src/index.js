import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.scss";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import setupInterceptors from "./custom/axios/config/Interceptors";
import {I18nextProvider} from "react-i18next";
import i18n from "./translation/i18n";
import setupNormal from "./custom/axios/normal/config/Interceptors";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {ConfigProvider} from 'antd';
import vi_VN from 'antd/es/locale/vi_VN';
import DocumentMeta from 'react-document-meta';
import "moment/locale/vi"
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/vi"
import setupRefresh from "./custom/axios/configRefreshToken/Interceptors";
import setupSpecial from "./custom/axios/configSpecial/Interceptors";

moment.locale("vi")

dayjs().locale("vi")

const root = ReactDOM.createRoot(document.getElementById('root'));

const meta = {
    title: 'Chou Cafe Vân Đình',
    description: 'Chou Cafe Vân Đình - Số 19 đường TT2, TTTM Vân Đình, Thị Trấn Vân Đình, Huyện Ứng Hòa, TP.Hà Nội ',
    meta: {
        charset: 'utf-8',
        name: {
            keywords: 'react,meta,document,html,tags'
        }
    }
}


root.render(
    <I18nextProvider i18n={i18n}>
        <DocumentMeta {...meta}>
            <Provider store={store}>
                <ConfigProvider locale={vi_VN}>
                    <App/>
                </ConfigProvider>
            </Provider>
        </DocumentMeta>
    </I18nextProvider>
);


setupInterceptors(store);
setupNormal(store)
setupRefresh(store)
setupSpecial(store)
serviceWorkerRegistration.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
