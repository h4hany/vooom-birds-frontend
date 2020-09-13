import {Injectable} from '@angular/core';
import {User} from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeManagerService {
  readonly currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

  hasPrivilege(permission: string) {
    // const selectedPrivilege = this.currentUser.privileges.find(privilege => privilege.name === permission);
    // return !!selectedPrivilege;
    return false;
    // if (this.currentUser && this.currentUser.privileges.length > 0) {
    //   selectedPrivilege
    //   return this.currentUser[permission] === 'true';
    // }

  }
}
