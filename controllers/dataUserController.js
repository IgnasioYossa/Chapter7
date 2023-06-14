const { UserGame, UserGameBiodata } = require('../models');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.getUserList = async (req, res) => {
  try {
    const userDataAll = await UserGame.findAll();
    res.render('userGameDataAll', { userDataAll });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.getAddUser = (req, res) => {
  res.render('userGameDataAllAdd');
};

exports.protectedRoute = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.redirect('/auth/login');
        } else {
          
          req.user = { username: decoded.username };
          next();
        }
      });
    } else {
      return res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    await UserGame.create({ username, password });
    res.redirect('/usergame/userlist');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.getUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserGame.findByPk(id);

    res.render('userGameDataAllUpdate', { user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = await UserGame.findByPk(id);

    user.username = username;
    user.password = password;
    await user.save();

    res.redirect('/usergame/userlist');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserGame.destroy({ where: { id: id } });

    res.redirect('/usergame/userlist');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.getBiodata = async (req, res) => {
  try {
    const userGameBiodata = await UserGameBiodata.findAll({
      include: UserGame,
    });
    res.render('userBiodata', { userGameBiodata });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.getAddBiodata = (req, res) => {
  res.render('userBiodataAdd');
};

exports.addBiodata = async (req, res) => {
  try {
    const { full_name, date_of_birth, sex } = req.body;

    await UserGameBiodata.create({
      full_name,
      date_of_birth,
      sex,
    });

    res.redirect('/usergame/biodata');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.getUpdateBiodata = async (req, res) => {
  try {
    const { id } = req.params;
    const userGameBiodata = await UserGameBiodata.findByPk(id);

    res.render('userBiodataUpdate', { userGameBiodata });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.updateBiodata = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, date_of_birth, sex, game_id } = req.body;

    await UserGameBiodata.update(
      { full_name, date_of_birth, sex, game_id },
      { where: { id } }
    );

    res.redirect('/usergame/biodata');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};

exports.deleteBiodata = async (req, res) => {
  try {
    const { id } = req.params;

    await UserGameBiodata.destroy({
      where: { id },
    });

    res.redirect('/usergame/biodata');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};
