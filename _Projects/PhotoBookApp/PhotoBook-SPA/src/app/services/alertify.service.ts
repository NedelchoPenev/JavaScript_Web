import { Injectable } from '@angular/core';
declare let alertify;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, e => {
      if (e) {
        okCallback();
      } else {}
    });
  }

  success(massage: string) {
    alertify.success(massage);
  }

  error(massage: string) {
    alertify.error(massage);
  }

  warning(massage: string) {
    alertify.warning(massage);
  }

  message(massage: string) {
    alertify.message(massage);
  }
}
