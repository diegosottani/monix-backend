import { supabase } from '../../init.js';

export const get_user = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter dados de usuário:', error);
    return res.status(500).json(error);
  }
}