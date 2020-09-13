export class OwnerProfile {

  constructor(
    public id: number,
    public fullName: string,
    public name: string,
    public job: string,
  ) {
  }

  static adapt(item: any): OwnerProfile {
    return new OwnerProfile(
      item.id,
      item.full_name,
      item.name,
      item.job,
    );
  }
}

