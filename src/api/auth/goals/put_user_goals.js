import { supabase } from '../../../init.js';

export const put_user_goals = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedgoal = {
        user_id: req.user.id,
        name: req.body.name,
        initial_value: req.body.initial_value,
        deadline: req.body.deadline,
        desired_value: req.body.desired_value
    };

    const { error } = await supabase
      .from('goals')
      .update(updatedgoal)
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).send("Objetivo atualizado com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar objetivo:', error);
    res.status(500).json({ error: 'Erro ao atualizar objetivo' });
  }
};
