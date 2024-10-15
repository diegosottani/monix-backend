import { supabase } from '../../../init.js';

export const delete_user_expenses = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!expenseId) {
      return res.status(400).json({ error: 'O id da despesa é obrigatório' });
    }

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseId);

    if (error) {
      throw error;
    }

    return res.status(200).send("Despesa excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
    return res.status(500).json({ error: 'Erro ao excluir despesa' });
  }
};
