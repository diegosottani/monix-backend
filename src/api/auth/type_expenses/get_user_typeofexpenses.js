import { supabase } from '../../../init.js';

export const get_user_typeofexpenses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('type_expenses')
      .select(`
        id,
        user_id,
         ENUM
      `)
      .eq('user_id', req.user.id);

    if (error) {
      throw error;
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao recuperar o tipo de despesa:', error);
    return res.status(500).json({ error: 'Erro ao recuperar o tipo de despesa' });
  }
};
