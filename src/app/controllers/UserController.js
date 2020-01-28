import * as Yup from 'yup';
import User from '../models/User';
import bcrypt from 'bcryptjs';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    const validate = await schema.isValid(req.body);

    // if (!schema.isValid(req.body)) {
    if (!validate) {
      return res.status(400).json({ error: 'Required Fields' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'UUUser alredy exists.' });
    }

    const { name, email } = await User.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  //     // this.addHook('beforeSave', async actualPassword => {
  //     //   if (req.body.password) {
  //     //     user.password_hash = await bcrypt.hash(user.password, 8);
  //     //   }
  //     //   console.log('SENHA ATUAL: ' +  actualPassword);
  //     // });

  //       console.log('ENTROUUUU ENVIO');
  //       console.log('EMAIL: ' + req.body.email);
  //       console.log('OLD PASS: ' + req.body.password);
  //       console.log('NEW PASS: ' + req.body.newPassword);
  //       console.log('ID REQ: ' + req.body.id);
  //       console.log('ENTROUUUU RETORNO: ');
  //       console.log('ID: ' + req.params.id);
  //       console.log('NAME: ' + user.name);
  //       console.log('EMAIL: ' + user.email);
  //       console.log('HASH: ' + user.password_hash);
  //       console.log('CREATED: ' + user.createdAt);
  //       console.log('UPDATED: ' + user.updatedAt);
  //       console.log('PASSWORD: ' + user.password);

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.uid);

      // user.password_hash = await bcrypt.hash(user.password, 8);

      // const confirmOldHash = await bcrypt.hash(req.body.password, 8);

      console.log('Confirm OLD PASS      : ' + req.body.password);
      // console.log('Confirm OLD PASS HASH : ' + confirmOldHash);
      console.log('OLD PASS HASH Origin  : ' + user.password_hash);

      await user.update(req.body);

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // async update(req, res) {
  //   const { email, oldPassword } = req.body;
  //   let { password } = req.body;

  //   const nPassword = '666666';
  //   password = nPassword;

  //   // const user = await User.findByPk(req.userId);

  //   const user = await User.findOne({ where: { email: req.body.email } });

  //   if (email !== user.email) {
  //     const userExists = await User.findOne({ where: { email } });

  //     if (userExists) {
  //       return res.status(400).json({ error: 'User já exists.' });
  //     }
  //   }

  //   if (oldPassword && !(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({ error: 'Invalid password.' });
  //   }

  //   // if (await user.checkPassword(password)) {
  //   //   return res.status(401).json({ error: 'Invalido password.' });
  //   // }

  //   const { id, name, password_hash } = await user.update(req.body);
  //   console.log(id);
  //   console.log(password);
  //   console.log(user.password_hash);
  //   console.log(name);
  //   console.log(user.email);
  //   console.log(email);
  //   // console.log(newPass);

  //   // const nPassword = '666666';
  //   // password = nPassword;

  //   return res.json({
  //     id,
  //     name,
  //     email,
  //     password,
  //     password_hash,
  //     // newPass,
  //   });
  // }
}

export default new UserController();
