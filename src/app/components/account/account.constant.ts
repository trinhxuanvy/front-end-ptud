declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
const ROUTES: RouteInfo[] = [
  {
    path: '/manage/account/profile',
    title: 'Thông tin cá nhân',
    icon: 'account_circle',
    class: '',
  },
  {
    path: '/manage/account/verify',
    title: 'Xác thực người dùng',
    icon: 'verified_user',
    class: '',
  },
  {
    path: '/manage/account/store',
    title: 'Cửa hàng',
    icon: 'store',
    class: '',
  },
  {
    path: '/manage/account/payment',
    title: 'Phương thức thanh toán',
    icon: 'payment',
    class: '',
  },
  {
    path: '/manage/account/password',
    title: 'Thay đổi mật khẩu',
    icon: 'key',
    class: '',
  },
];

export { ROUTES };
