import { supabase } from '../../../init.js';

export const post_account = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'O nome da conta é obrigatório' });
    }

    const { error } = await supabase
      .from('accounts')
      .insert({ user_id: req.user.id, name: req.body.name });

    if (error) throw error;

    return res.status(201).json('Conta criada com sucesso');
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return res.status(500).json({ error: 'Erro ao criar conta' });
  }
};
