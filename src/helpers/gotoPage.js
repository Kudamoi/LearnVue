import eventBus from '@/eventBus';

export default function gotoPage(page, pageParams) {
  eventBus.$emit('gotoPage', {
    page,
    params: pageParams ?? {},
  });
}
