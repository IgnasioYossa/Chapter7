const fs = require('fs');
const { UserGame } = require('../models');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const usersFilePath = 'users.json';

function getUsersData() {
  const usersData = fs.readFileSync(usersFilePath, { encoding: 'utf8' });
  return JSON.parse(usersData);
}

exports.getLoginPage = (req, res) => {
  res.render('login');
};

exports.getLoginChoicePage = (req, res) => {
  res.render('loginChoice');
};

exports.getAdminLoginPage = (req, res) => {
  res.render('adminLogin');
};

exports.loginUser = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
  
      const user = await UserGame.findOne({ where: { username, password } });
  
      if (user) {
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  
        res.cookie('token', token);
  
        return res.redirect('/rock-paper-scissor');
      } else {
        return res.send('Invalid username or password. <a href="/auth/login">Go back to login page</a>');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  };

exports.loginAdmin = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
  
      const user = await UserGame.findOne({ where: { username, password } });
  
      if (user) {
        const token = jwt.sign({ username: user.username, isAdmin: true }, secretKey, { expiresIn: '1h' });
  
        res.cookie('token', token);
  
        return res.redirect('/usergame/userlist');
      } else {
        return res.send('Invalid username or password. <a href="/auth/login">Go back to login page</a>');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  };
  

exports.getRegisterPage = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserGame.findOne({ where: { username } });

    if (existingUser) {
      return res.send('Username already exists');
    } else {
      await UserGame.create({ username, password });
      return res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
};
