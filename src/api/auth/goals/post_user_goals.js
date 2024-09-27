import { supabase } from '../../../init.js';

export const post_user_goals = async (req, res) => {
  try {
    if (!req.body.name 
      || isNaN(req.body.initial_value)
      || !req.body.deadline 
      || isNaN(req.body.desired_value)
    ) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
      return;
    }
    const { error } = await supabase
      .from('goals')
      .insert({
        user_id: req.user.id,
        name: req.body.name,
        initial_value: req.body.initial_value,
        deadline: req.body.deadline,
        desired_value: req.body.desired_value
      });
      if (error) throw error;

    res.status(200).send("Objetivo criado com sucesso");
  } catch (error) {
    console.error('Erro ao criar objetivo:', error);
    res.status(500).json({ error: 'Erro ao criar objetivo' });
  }
};
