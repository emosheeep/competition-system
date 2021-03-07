import Vue from 'vue';
import Drawer from '@/components/Drawer';

/**
 * $drawer的扩展
 */
export default function(data) {
  const instance = new Vue(Drawer);
  Object.assign(instance.$data, data);
  document.body.appendChild(instance.$mount().$el);
  instance.visible = true;
};
