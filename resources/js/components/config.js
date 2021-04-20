



//Getting User Data from Blade frontend
export const USER_ID = (document.getElementById('dashboardindex')) ? $('#dashboardindex').data('name') : 0;

export const APP_URL = (document.getElementById('dashboardindex')) ? $('#dashboardindex').data('url') : 'd';

export const API_BASE_URL = APP_URL + '/api';

export const APP_NAME = "Lenshub";

export const HOME_APP_URL = (document.getElementById('home')) ? $('#home').data('url') : 'd';
export const HOME_API_BASE_URL = HOME_APP_URL + '/api';


export const ITEM = (document.getElementById('item')) ? $('#item').data('item') : 'd';
export const ITEM_APP_URL = (document.getElementById('item')) ? $('#item').data('url') : 'd';
export const ITEM_API_BASE_URL = ITEM_APP_URL + '/api';

 export const ITEMPRODUCT = (document.getElementById('itemProduct')) ? $('#itemProduct').data('itemp') : 'd';
export const ITEMPRODUCT_APP_URL = (document.getElementById('itemProduct')) ? $('#itemProduct').data('url') : 'd';
export const ITEMPRODUCT_API_BASE_URL = ITEMPRODUCT_APP_URL + '/api';


export const HEAD_APP_URL = (document.getElementById('adminloginview')) ? $('#adminloginview').data('url') : 'd';
export const HEAD_API_BASE_URL = HEAD_APP_URL + '/api';
