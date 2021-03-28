import { Users } from "../Models/User";
import Password from "../Helpers/Password";
import { IRegister } from "../Types/User";

export default class UserRepository {

	public static async Register(req: IRegister): Promise<Users> {
		try {
			const exists: Users = await Users.findOne({ where: [{ email: req.email }] });
			if (exists) throw "email taken";

			const newUser: Users = new Users();
			newUser.email = req.email;
			newUser.password = await Password.Hash(req.password);

			return await newUser.save();
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Login(req: IRegister): Promise<Users> {
		try {
			const exists: Users = await Users.findOne({ where: { email: req.email } });
			if (!exists) throw "email not found";

			const match = await Password.Compare(req.password, exists.password);
			if (!match) throw "incorrect password";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindOne(id: number): Promise<Users> {
		try {
			const exists: Users = await Users.findOne({ where: { id } });
			if (!exists) throw "user not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}
}