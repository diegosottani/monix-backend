import { supabase } from '../../../init.js';

export const get_users = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return res.status(500).json({ error: 'Erro ao obter usuários' });
  }
};
