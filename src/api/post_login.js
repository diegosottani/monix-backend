import { authLogin, handleGoogleCallback } from "./../auth/authLogin.js";
import { createDbUser } from './../database/createDbUser.js';
import { checkEmailRecords } from '../database/checkEmailRecords.js';
import { createTypeExpenses, createOtherIncomings, createOtherExpenses, createOtherInvestments, createOtherAccounts, createOtherCards, createOtherMembers, createOtherExpensesSubcategory } from '../database/createDefaultRows.js';

export const post_login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // Email/password login
    try {
      const jwt = await authLogin(email, password);
      res.status(200).json(jwt);
    } catch (error) {
      res.status(400).send("Credenciais inválidas");
    }
  } else {
    res.status(400).send("Email e senha são necessários para login");
  }
};

export const post_google = async (req, res) => {
  try {
    const { idToken } = req.body;
    const { user, session } = await handleGoogleCallback(idToken);
    user['access_token'] = session.access_token;
    user['refresh_token'] = session.refresh_token;

    const emailExists = await checkEmailRecords(user.email);
    if (emailExists.length <= 0) {
      let userData = { id: user.id, email: user.email, name: user.user_metadata.name };
      await createDbUser(userData);
      
      await createTypeExpenses(user.id);
      await createOtherIncomings(user.id);
      await createOtherExpenses(user.id);
      await createOtherExpensesSubcategory(user.id);
      await createOtherInvestments(user.id);
      await createOtherAccounts(user.id);
      await createOtherCards(user.id);
      await createOtherMembers(user.id);
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("Falha no login com Google");
  }
};
