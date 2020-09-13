import {Injectable} from '@angular/core';
import {EndPointService} from './end-point.service';
import {OwnerProfile} from '../../models/ownerProfile.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends EndPointService<OwnerProfile> {
  protected  endPointUrl = 'ownerProfile';
  protected  pluralize = 'owner_profiles';
  protected  singular = 'owner_profile';
  protected modelType = OwnerProfile;
}
