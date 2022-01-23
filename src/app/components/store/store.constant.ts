declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
const ROUTES: RouteInfo[] = [
  {
    path: '/manage/store/certificate',
    title: 'Chứng nhận',
    icon: 'verified_user',
    class: '',
  },
  {
    path: '/manage/store/analytics',
    title: 'Phân tích',
    icon: 'analytics',
    class: '',
  },
  {
    path: '/manage/store/products',
    title: 'Sản phẩm',
    icon: 'store',
    class: '',
  },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'notifications',
    class: '',
  },
];

export { ROUTES };
