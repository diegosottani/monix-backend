import { supabase } from '../../../init.js';

export const get_user_expense_by_id = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select(`*`)
      .eq('user_id', req.user.id)
      .eq('id', req.params.id)

    if (error) throw error;
    
    return res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao buscar dados de despesa:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados de despesa' });
  }
};