import { supabase } from '../../../init.js';

export const delete_user_planned_investment = async (req, res) => {
  try {
    const planned_investment_id = req.params.id;

    if (!planned_investment_id) {
      return res.status(400).json({ error: 'O id do investimento planejado é obrigatório' });
    }

    const { error } = await supabase
      .from('planned_investment')
      .delete()
      .eq('id', planned_investment_id);

    if (error) {
      throw error;
    }

    return res.status(200).send("Investimento planejado excluído com sucesso");
  } catch (error) {
    console.error('Erro ao excluir investimento planejado:', error);
    return res.status(500).json({ error: 'Erro ao excluir investimento planejado' });
  }
};
