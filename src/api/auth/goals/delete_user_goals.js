import { supabase } from '../../../init.js';

export const delete_user_goals = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'O id de objetivo é obrigatório' });
    }

    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return res.status(200).send("Objetivo excluído com sucesso");
  } catch (error) {
    console.error('Erro ao excluir objetivo:', error);
    return res.status(500).json({ error: 'Erro ao excluir objetivo' });
  }
};
