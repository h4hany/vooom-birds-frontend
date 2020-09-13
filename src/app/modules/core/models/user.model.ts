export class User {

  constructor(
    public id: number,
    public email: string,
    public name: string,
    public job: string,
  ) {
  }

  static adapt(item: any): User {
    return new User(
      item.id,
      item.email,
      item.name,
      item.job,
    );
  }
}

