import { supabase } from '../../../init';

export const get_user_expense_by_id = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select(`*`)
      .eq('user_id', req.user.id)
      .eq('id', req.params.id)

    if (error) throw error;
    
    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao buscar dados de despesa:', error);
    res.status(500).json({ error: 'Erro ao buscar dados de despesa' });
  }
};