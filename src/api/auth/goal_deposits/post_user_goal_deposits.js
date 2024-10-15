import { supabase } from '../../../init.js';

export const post_user_goal_deposits = async (req, res) => {

  try {
    if (!req.body.goal_id || !req.body.deposit) {
      return res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }
    const { error } = await supabase
      .from('goal_deposits')
      .insert({
        goal_id: req.body.goal_id,
        deposit: req.body.deposit,
        date: req.body.date,
        note: req.body.note
      });
      if (error) throw error;

    return res.status(200).send("Valor de Objetivo depositado com sucesso");
  } catch (error) {
    return res.status(500).json(error);
  }
};
