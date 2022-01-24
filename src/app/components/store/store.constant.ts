declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  endPath: string;
}
const ROUTES: RouteInfo[] = [
  {
    path: '/manage/store/',
    title: 'Chứng nhận',
    icon: 'verified_user',
    class: '',
    endPath: '/certificate',
  },
  {
    path: '/manage/store/',
    title: 'Phân tích',
    icon: 'analytics',
    class: '',
    endPath: '/analytics',
  },
  {
    path: '/manage/store/',
    title: 'Sản phẩm',
    icon: 'store',
    class: '',
    endPath: '/uploadproducts',
  },
  {
    path: '/manage/store/',
    title: 'Phản hồi',
    icon: 'send',
    class: '',
    endPath: '/response',
  },
];

export { ROUTES, RouteInfo };
