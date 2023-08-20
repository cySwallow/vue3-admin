import request from '@/utils/request';

export function tenantList() {
  return request({
    url: '/auth/tenant/list'
  });
}

export function codeImg() {
  return request({
    url: '/auth/code'
  });
}
export function login(data) {
  return request({
    url: '/login',
    // headers: {
    //   isToken: false,
    //   isEncrypt: true
    // },
    method: 'post',
    data
  });
}
