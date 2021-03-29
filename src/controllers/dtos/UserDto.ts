import { IUser } from "../../models/User";

class UserDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: string;

  constructor(UserSchema: IUser) {
    this.id = UserSchema._id;
    this.name = UserSchema.name;
    this.email = UserSchema.email;
    this.role = UserSchema.role;
  }
}

export default UserDto;