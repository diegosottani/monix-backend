import { createAuthUser } from './../auth/createAuthUser.js';
import { createDbUser } from './../database/createDbUser.js';
import { checkEmailRecords } from '../database/checkEmailRecords.js';
import { createTypeExpenses, createOtherIncomings, createOtherExpenses, createOtherInvestments, createOtherAccounts, createOtherCards, createOtherMembers } from '../database/createDefaultRows.js';

export const post_signup =  async (req, res) => {
  let {email, password, name} = req.body;

  if(!email || !password || !name) {
    res.status(400).json({ error: 'É necessário preencher todos os campos obrigatórios' });
  }

  try {
    const emailExists = await checkEmailRecords(email);

    if (emailExists.length > 0) {
      return res.status(400).send('Email já cadastrado');
    }
    // 1. Insere novo usuário na Auth do supabase
    let authId = await createAuthUser(email, password, name);

    // 2. Insere novo usuário na tabela Users do supabase
    let userData = { id: authId, email, name };
    const user = await createDbUser(userData);
    
    await createTypeExpenses(authId);
    await createOtherIncomings(authId);
    await createOtherExpenses(authId);
    await createOtherInvestments(authId);
    await createOtherAccounts(authId);
    await createOtherCards(authId);
    await createOtherMembers(authId);

    res.status(200).send("Usuário cadastro com sucesso", user);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
};