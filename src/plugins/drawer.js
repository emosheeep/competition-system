import Drawer from '@/components/Drawer';

/**
 * $drawer的扩展
 */
export default function(data) {
  const instance = new Drawer({ data }).$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
};
