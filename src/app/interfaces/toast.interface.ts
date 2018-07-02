export interface ToastInterface {
  type: 'success' | 'warning' | 'error';
  title: string;
  message: string;
}
