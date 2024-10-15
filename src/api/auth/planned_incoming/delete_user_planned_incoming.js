import { supabase } from '../../../init.js';

export const delete_user_planned_incoming = async (req, res) => {
  try {
    const planned_incoming_id = req.params.id;

    if (!planned_incoming_id) {
      return res.status(400).json({ error: 'O id da receita planejada é obrigatório' });
    }

    const { error } = await supabase
      .from('planned_incoming')
      .delete()
      .eq('id', planned_incoming_id);

    if (error) {
      throw error;
    }

    return res.status(200).send("Entrada planejada excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir entrada planejada:', error);
    return res.status(500).json({ error: 'Erro ao excluir entrada planejada' });
  }
};
